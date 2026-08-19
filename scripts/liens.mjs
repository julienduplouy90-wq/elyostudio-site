// Contrôle du maillage interne sur le site construit :
//   - aucune page orpheline (sans lien entrant depuis une autre page) ;
//   - aucun lien interne cassé ;
//   - nombre de liens entrants par page, pour repérer les pages isolées.
//
// Lancer avec : npm run build && node scripts/liens.mjs
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const fichiers = [];
const parcourir = (dossier) => {
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (entree.endsWith('.html')) fichiers.push(chemin);
  }
};
parcourir('dist');

const versUrl = (chemin) =>
  chemin.replace(/^dist/, '').replace(/\\/g, '/').replace(/\/index\.html$/, '/') || '/';

const pages = fichiers
  .map(versUrl)
  .filter((u) => !u.startsWith('/admin/') && u !== '/404.html');

const normaliser = (href) => {
  let u = href.split('#')[0].split('?')[0];
  if (!u.startsWith('/')) return null;
  if (!u.endsWith('/') && !u.includes('.')) u += '/';
  return u;
};

const entrants = new Map(pages.map((p) => [p, 0]));
const casses = [];

for (const fichier of fichiers) {
  const source = versUrl(fichier);
  if (source.startsWith('/admin/')) continue;
  const html = readFileSync(fichier, 'utf8');
  const liens = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const brut of liens) {
    const cible = normaliser(brut);
    if (!cible || cible === source) continue;
    if (entrants.has(cible)) {
      entrants.set(cible, entrants.get(cible) + 1);
    } else if (!/\.(png|jpe?g|svg|xml|txt|webmanifest|ico|css|js|json)$/.test(cible)) {
      const existe = existsSync(join('dist', cible.replace(/\/$/, ''), 'index.html'));
      if (!existe) casses.push(`${source} → ${brut}`);
    }
  }
}

console.log('LIENS ENTRANTS PAR PAGE');
const triees = [...entrants.entries()].sort((a, b) => a[1] - b[1]);
for (const [page, n] of triees) {
  const alerte = n === 0 ? '   ⚠ PAGE ORPHELINE' : '';
  console.log(`  ${String(n).padStart(3)}  ${page}${alerte}`);
}

const orphelines = triees.filter(([p, n]) => n === 0 && p !== '/');
console.log('\nPages orphelines :', orphelines.length ? orphelines.map(([p]) => p).join(', ') : 'aucune');
console.log('Liens internes cassés :', casses.length ? '\n  - ' + casses.join('\n  - ') : 'aucun');
