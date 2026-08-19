// Applique les espaces insécables de la typographie française :
//   « texte » et les signes doubles ( : ; ! ? ) précédés d'une espace fine insécable.
// Lancer avec : node scripts/typographie.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const INSECABLE = ' '; // espace insécable
const racines = ['src'];
const extensions = new Set(['.astro', '.md', '.js', '.ts']);

let touches = 0;

const traiter = (chemin) => {
  const source = readFileSync(chemin, 'utf8');
  const lignes = source.split('\n');
  let modifie = false;

  const resultat = lignes.map((ligne) => {
    // On laisse tranquille les lignes qui ressemblent à du code (ternaires, sélecteurs CSS).
    if (/\s\?\s/.test(ligne) || /^\s*[.#@:&a-zA-Z-]+[^;]*\{/.test(ligne)) return ligne;

    let nouvelle = ligne
      .replace(/«\s+/g, `«${INSECABLE}`)
      .replace(/\s+»/g, `${INSECABLE}»`)
      .replace(/([^\s ]) ([:;!?])(\s|$)/g, `$1${INSECABLE}$2$3`);

    if (nouvelle !== ligne) modifie = true;
    return nouvelle;
  });

  if (modifie) {
    writeFileSync(chemin, resultat.join('\n'));
    touches += 1;
    console.log('typographie corrigée :', chemin);
  }
};

const parcourir = (dossier) => {
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (extensions.has(extname(chemin))) traiter(chemin);
  }
};

racines.forEach(parcourir);
console.log(`${touches} fichier(s) modifié(s).`);
