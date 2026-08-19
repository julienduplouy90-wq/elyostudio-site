// Copie, depuis node_modules vers public/, le tableau de bord du CMS : près
// de 2 Mo auto-hébergés pour ne dépendre d'aucun CDN. Lancé automatiquement
// avant `npm run dev` et `npm run build` ; le fichier produit n'est pas
// versionné.
//
// Les polices, elles, ne passent plus par ici : elles sont allégées une fois
// pour toutes par scripts/polices.mjs et versionnées dans public/fonts/.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const copier = (de, vers, libelle) => {
  try {
    copyFileSync(new URL(de, import.meta.url), new URL(vers, import.meta.url));
    return true;
  } catch (erreur) {
    console.warn(`${libelle} non copié :`, erreur.message);
    return false;
  }
};

const creer = (dossier) => {
  const url = new URL(dossier, import.meta.url);
  if (!existsSync(url)) mkdirSync(url, { recursive: true });
};

creer('../public/admin/');
if (copier('../node_modules/@sveltia/cms/dist/sveltia-cms.js', '../public/admin/sveltia-cms.js', 'CMS')) {
  console.log('CMS copié dans public/admin/sveltia-cms.js');
}
