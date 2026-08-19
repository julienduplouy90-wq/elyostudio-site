// Copie, depuis node_modules vers public/, les deux ressources qui doivent
// porter un nom de fichier stable. Lancé automatiquement avant `npm run dev`
// et `npm run build` ; rien de tout cela n'est versionné.
//
//   public/admin/sveltia-cms.js   le tableau de bord du CMS (près de 2 Mo,
//                                 auto-hébergé pour ne dépendre d'aucun CDN)
//   public/fonts/newsreader-*.woff2  la police des titres, préchargée dans
//                                 l'en-tête : un fichier passé par le build
//                                 reçoit un nom haché, impossible à cibler.
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

creer('../public/fonts/');
let polices = 0;
for (const sous of ['latin', 'latin-ext']) {
  if (
    copier(
      `../node_modules/@fontsource-variable/newsreader/files/newsreader-${sous}-wght-normal.woff2`,
      `../public/fonts/newsreader-${sous}.woff2`,
      'Police',
    )
  ) {
    polices += 1;
  }
}
if (polices) console.log(`Police des titres copiée dans public/fonts/ (${polices} fichiers)`);
