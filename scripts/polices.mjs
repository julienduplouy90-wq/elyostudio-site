// Fabrique les polices allégées déposées dans public/fonts/.
//
// Ce script n'est PAS lancé par le build : les fichiers produits sont
// versionnés, pour que ni le build local ni GitHub Actions n'aient à
// installer d'outil supplémentaire. On le relance à la main le jour où on
// change de police, de graisse ou de jeu de caractères :
//
//   npm install --no-save subset-font
//   node scripts/polices.mjs
//
// Principe : les polices variables complètes de Google pèsent lourd parce
// qu'elles portent tous les caractères et toute l'étendue des axes. On ne
// garde que les caractères employés par le site (avec une marge confortable
// pour les textes à venir) et que l'étendue des graisses réellement
// déclarées dans le CSS, soit 400 à 700.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, extname, dirname } from 'node:path';
import subsetFont from 'subset-font';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sortie = join(racine, 'public/fonts');

// ------------------------------------------------- caractères à conserver
function parcourir(dossier, extensions, accumulateur = []) {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) {
      if (nom === 'node_modules' || nom === '.git') continue;
      parcourir(chemin, extensions, accumulateur);
    } else if (extensions.includes(extname(nom))) {
      accumulateur.push(chemin);
    }
  }
  return accumulateur;
}

// Tout ce que le site écrit aujourd'hui…
const caracteres = new Set();
for (const fichier of parcourir(join(racine, 'src'), ['.astro', '.md', '.json'])) {
  for (const c of readFileSync(fichier, 'utf8')) caracteres.add(c);
}

// … plus une marge : le latin-1 complet (accents français, espagnols,
// allemands), la ponctuation typographique et les espaces insécables que
// pose scripts/typographie.mjs, quelques symboles.
const plages = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2015],
  [0x2018, 0x201e],
  [0x2020, 0x2022],
  [0x2039, 0x203a],
];
const isoles = [
  0x0131, 0x0152, 0x0153, 0x0178,
  0x02bb, 0x02bc, 0x02c6, 0x02da, 0x02dc,
  0x2009, 0x200b, 0x202f, 0x2060,
  0x2026, 0x2030, 0x2044,
  0x20ac, 0x2122,
  0x2190, 0x2191, 0x2192, 0x2193,
  0x2212, 0x2215, 0x2713, 0x2714,
  0xfeff, 0xfffd,
];
for (const [debut, fin] of plages) {
  for (let c = debut; c <= fin; c += 1) caracteres.add(String.fromCodePoint(c));
}
for (const c of isoles) caracteres.add(String.fromCodePoint(c));

const jeuLatin = [...caracteres].join('');

// Le jeu étendu sert aux noms d'Europe centrale ou du Nord qu'une cliente
// pourrait écrire un jour. Il n'est jamais téléchargé pour un texte français.
const etendu = new Set(caracteres);
for (let c = 0x0100; c <= 0x017f; c += 1) etendu.add(String.fromCodePoint(c));
const jeuEtendu = [...etendu].join('');

// ------------------------------------------------------------- fabrication
// Newsreader garde son axe de taille optique : c'est lui qui ajuste le
// contraste des titres selon leur taille. Le retirer allégerait encore de
// 48 Ko mais décalerait la largeur des titres jusqu'à 5 %.
const travaux = [
  {
    source: '@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2',
    cible: 'newsreader-latin.woff2',
    jeu: jeuLatin,
    axes: { wght: { min: 400, max: 700 }, opsz: { min: 12, max: 64 } },
  },
  {
    source: '@fontsource-variable/newsreader/files/newsreader-latin-ext-opsz-normal.woff2',
    cible: 'newsreader-latin-ext.woff2',
    jeu: jeuEtendu,
    axes: { wght: { min: 400, max: 700 }, opsz: { min: 12, max: 64 } },
  },
  {
    source: '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    cible: 'inter-latin.woff2',
    jeu: jeuLatin,
    axes: { wght: { min: 400, max: 700 } },
  },
  {
    source: '@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2',
    cible: 'inter-latin-ext.woff2',
    jeu: jeuEtendu,
    axes: { wght: { min: 400, max: 700 } },
  },
];

mkdirSync(sortie, { recursive: true });
console.log(`caractères conservés : ${caracteres.size} (latin), ${etendu.size} (étendu)`);

let avant = 0;
let apres = 0;
for (const travail of travaux) {
  const original = readFileSync(join(racine, 'node_modules', travail.source));
  const allegee = await subsetFont(original, travail.jeu, {
    targetFormat: 'woff2',
    variationAxes: travail.axes,
  });
  writeFileSync(join(sortie, travail.cible), allegee);
  avant += original.length;
  apres += allegee.length;
  console.log(
    `${travail.cible.padEnd(26)} ${String(original.length).padStart(7)} → ${String(allegee.length).padStart(7)} o` +
      `  (−${Math.round((1 - allegee.length / original.length) * 100)} %)`,
  );
}
console.log(`total ${avant} → ${apres} o (−${Math.round((1 - apres / avant) * 100)} %)`);
