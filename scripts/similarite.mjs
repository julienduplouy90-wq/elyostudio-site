// Mesure la similarité textuelle entre les pages locales, et compte les mots.
// Objectif : rester nettement sous 40 % de similarité entre deux pages villes,
// seuil au-delà duquel Google traite le groupe comme du contenu dupliqué.
//
// Lancer avec : npm run build && node scripts/similarite.mjs
import { readFileSync, existsSync } from 'node:fs';

const pages = [
  ['pivot', 'dist/creation-site-internet-naturopathe/index.html'],
  ['Tarbes', 'dist/creation-site-internet-naturopathe-tarbes/index.html'],
  ['Pau', 'dist/creation-site-internet-naturopathe-pau/index.html'],
  ['Lourdes', 'dist/creation-site-internet-naturopathe-lourdes/index.html'],
  ['Bagnères', 'dist/creation-site-internet-naturopathe-bagneres-de-bigorre/index.html'],
  ['art. Google', 'dist/blog/naturopathe-etre-trouve-sur-google/index.html'],
  ['art. fiche', 'dist/blog/fiche-google-business-naturopathe/index.html'],
  ['art. invisible', 'dist/blog/site-naturopathe-pas-visible-google/index.html'],
  ['art. droit', 'dist/blog/ce-quon-na-pas-le-droit-decrire-site-naturopathe/index.html'],
  ['art. seo local', 'dist/blog/referencement-local-naturopathe/index.html'],
];

// Texte du <main>, sans les scripts ni le balisage.
const texte = (chemin) => {
  const html = readFileSync(chemin, 'utf8');
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
};

const mots = (t) => t.split(/[^a-zà-öø-ÿ0-9’']+/).filter((m) => m.length > 2);

// Similarité de Jaccard sur les suites de trois mots.
const trigrammes = (t) => {
  const m = mots(t);
  const s = new Set();
  for (let i = 0; i < m.length - 2; i += 1) s.add(`${m[i]} ${m[i + 1]} ${m[i + 2]}`);
  return s;
};

const jaccard = (a, b) => {
  let communs = 0;
  for (const x of a) if (b.has(x)) communs += 1;
  return communs / (a.size + b.size - communs);
};

const donnees = pages
  .filter(([, chemin]) => existsSync(chemin))
  .map(([nom, chemin]) => {
    const t = texte(chemin);
    return { nom, mots: mots(t).length, tri: trigrammes(t) };
  });

if (donnees.length === 0) {
  console.log('Aucune page trouvée : lancez d’abord `npm run build`.');
  process.exit(0);
}

console.log('NOMBRE DE MOTS');
for (const d of donnees) {
  const cible = d.nom === 'pivot' ? '1 500 visés' : d.nom.startsWith('art.') ? '1 200 à 1 800 visés' : '900 à 1 200 visés';
  console.log(`  ${d.nom.padEnd(10)} ${String(d.mots).padStart(5)} mots   (${cible})`);
}

console.log('\nSIMILARITÉ ENTRE PAGES (trigrammes, seuil d’alerte 40 %)');
let maximum = 0;
for (let i = 0; i < donnees.length; i += 1) {
  for (let j = i + 1; j < donnees.length; j += 1) {
    const taux = jaccard(donnees[i].tri, donnees[j].tri) * 100;
    maximum = Math.max(maximum, taux);
    const alerte = taux > 40 ? '  ⚠ TROP PROCHE' : '';
    console.log(`  ${donnees[i].nom.padEnd(10)} ↔ ${donnees[j].nom.padEnd(10)} ${taux.toFixed(1).padStart(5)} %${alerte}`);
  }
}

console.log(
  `\nMaximum observé : ${maximum.toFixed(1)} % — ${maximum > 40 ? 'à réécrire.' : 'sous le seuil, rien à faire.'}`,
);
