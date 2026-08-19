// Copie le tableau de bord Sveltia CMS depuis node_modules vers public/admin/.
// Lancé automatiquement avant `npm run dev` et `npm run build`, de sorte que le
// fichier n'est pas versionné et suit toujours la version installée du paquet.
//
// L'auto-hébergement évite de dépendre d'un CDN pour charger l'interface
// d'administration (le fichier fait près de 2 Mo).
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const source = new URL('../node_modules/@sveltia/cms/dist/sveltia-cms.js', import.meta.url);
const dossier = new URL('../public/admin/', import.meta.url);

try {
  if (!existsSync(dossier)) mkdirSync(dossier, { recursive: true });
  copyFileSync(source, new URL('sveltia-cms.js', dossier));
  console.log('CMS copié dans public/admin/sveltia-cms.js');
} catch (erreur) {
  console.warn('CMS non copié :', erreur.message);
}
