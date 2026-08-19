// Vérifie la longueur des balises title / meta description et la présence des
// signaux SEO de base dans le site construit (dist/).
// Lancer avec : npm run build && node scripts/audit-meta.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pages = [];
const parcourir = (dossier) => {
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (entree === 'index.html' || entree === '404.html') pages.push(chemin);
  }
};
parcourir('dist');

const LIMITE_TITRE = 60;
const LIMITE_DESC = 160;
let alertes = 0;

console.log('page'.padEnd(40) + 'titre  desc  hreflang  ld+json  h1');
console.log('-'.repeat(80));

for (const chemin of pages.sort()) {
  const html = readFileSync(chemin, 'utf8');
  const titre = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? '';
  const hreflang = (html.match(/hreflang/g) || []).length;
  const ld = (html.match(/application\/ld\+json/g) || []).length;
  const h1 = (html.match(/<h1[^>]*>/g) || []).length;

  const nom = chemin.replace(/^dist/, '').replace(/\\/g, '/').replace(/\/index\.html$/, '/') || '/';
  const souci = [];
  if (titre.length > LIMITE_TITRE) souci.push(`titre ${titre.length}`);
  if (desc.length > LIMITE_DESC) souci.push(`desc ${desc.length}`);
  if (h1 !== 1) souci.push(`${h1} h1`);
  if (souci.length) alertes += 1;

  console.log(
    nom.padEnd(40) +
      String(titre.length).padStart(5) +
      String(desc.length).padStart(6) +
      String(hreflang).padStart(10) +
      String(ld).padStart(9) +
      String(h1).padStart(4) +
      (souci.length ? '   ⚠ ' + souci.join(', ') : ''),
  );
}

console.log('-'.repeat(80));
console.log(alertes === 0 ? 'Aucune alerte.' : `${alertes} page(s) à revoir.`);
