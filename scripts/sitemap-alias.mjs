// Astro génère sitemap-index.xml ; beaucoup d'outils et de robots cherchent
// /sitemap.xml. On recopie l'index sous ce nom après le build.
import { copyFileSync, existsSync } from 'node:fs';

const index = new URL('../dist/sitemap-index.xml', import.meta.url);
const alias = new URL('../dist/sitemap.xml', import.meta.url);

if (existsSync(index)) {
  copyFileSync(index, alias);
  console.log('sitemap.xml créé (copie de sitemap-index.xml)');
} else {
  console.warn('sitemap-index.xml introuvable : alias non créé');
}
