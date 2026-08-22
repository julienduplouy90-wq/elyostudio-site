// Bascule de la charte « crème / vert / terracotta » vers « blanc / bleu nuit /
// cuivre ». Lancé une fois à la main (node scripts/palette.mjs) : il réécrit
// les jetons de global.css et remplace, fichier par fichier, les couleurs
// codées en dur qui dérivaient de l'ancienne palette. Conservé dans le dépôt
// pour garder la trace exacte de la correspondance.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(fileURLToPath(import.meta.url), '..', '..');

// --- Jetons : même nom, nouvelle valeur (les composants n'ont pas à changer).
const jetons = {
  '--creme': '#FFFFFF',
  '--creme-2': '#F4F6FA',
  '--creme-3': '#E9EDF4',
  '--blanc': '#FFFFFF',
  '--encre': '#111A2E',
  '--encre-2': '#4A5567',
  '--encre-3': '#6B7688',
  '--vert': '#1C2E57',
  '--vert-2': '#2B4178',
  '--vert-clair': '#E6ECF7',
  '--terre': '#C0663C',
  '--terre-2': '#A2532E',
  '--terre-clair': '#F9E9DF',
  '--ambre': '#D9A06A',
  '--or': '#D4B27A',
  '--ligne': 'rgba(17, 26, 46, 0.10)',
  '--ligne-forte': 'rgba(17, 26, 46, 0.16)',
  '--ombre-xs': '0 1px 2px rgba(17, 26, 46, 0.05)',
  '--ombre-s': '0 2px 6px -1px rgba(17, 26, 46, 0.07), 0 1px 2px rgba(17, 26, 46, 0.04)',
  '--ombre-m': '0 12px 26px -12px rgba(17, 26, 46, 0.18), 0 3px 8px -4px rgba(17, 26, 46, 0.08)',
  '--ombre-l': '0 30px 60px -24px rgba(17, 26, 46, 0.24), 0 10px 22px -14px rgba(17, 26, 46, 0.12)',
  '--ombre-xl': '0 50px 96px -32px rgba(17, 26, 46, 0.30), 0 16px 32px -20px rgba(17, 26, 46, 0.16)',
};

// --- Couleurs codées en dur : ancienne → nouvelle (hex et triplets rgba).
const hex = {
  '#FCF8F2': '#FFFFFF', '#F6EEE3': '#F4F6FA', '#EFE3D3': '#E9EDF4',
  '#23201C': '#111A2E', '#5A5048': '#4A5567', '#6E6053': '#6B7688',
  '#2E5A4B': '#1C2E57', '#3F7360': '#2B4178', '#DFEAE2': '#E6ECF7',
  '#1F3E34': '#0F1A33', '#24473C': '#162447', '#1D3A31': '#0F1A33',
  '#B8552F': '#C0663C', '#9C4525': '#A2532E', '#C25E36': '#C0663C', '#F8E5DA': '#F9E9DF',
  '#E8A85C': '#D9A06A', '#D9B872': '#D4B27A',
  '#F2F7F3': '#F4F6FA', '#F1F7F2': '#F4F6FA',
  '#FBF3E9': '#FBF4EE', '#FDFAF5': '#F9FAFC', '#FDF8F1': '#F9FAFC', '#F3E9DB': '#EEF2F9',
  '#C7DCCF': '#D5DEF0', '#CBDDD1': '#D5DEF0', '#CFE0D4': '#D5DEF0', '#C6DBCE': '#D5DEF0',
  '#E3D8C8': '#E3E8F1', '#C9BCA9': '#BFC8DA', '#D9CEC0': '#D6DCE8', '#E5DBCC': '#E1E6F0',
  '#DCD1C0': '#D9DFEA', '#E0D5C6': '#DDE3EE',
  '#34302B': '#1A2238', '#1E1B18': '#0E1428',
  '#EFD0BF': '#F0D4C4', '#FAEBD3': '#F7EEDF', '#F1DAB6': '#EFDDC0',
};
const rgba = {
  '223, 234, 226': '230, 236, 247',
  '248, 229, 218': '249, 233, 223',
  '232, 168, 92': '217, 160, 106',
  '46, 90, 75': '28, 46, 87',
  '184, 85, 47': '192, 102, 60',
  '156, 69, 37': '162, 83, 46',
  '252, 248, 242': '255, 255, 255',
  '246, 238, 227': '244, 246, 250',
  '35, 32, 28': '17, 26, 46',
  '74, 52, 32': '17, 26, 46',
  '217, 184, 114': '212, 178, 122',
};

function remplacerCouleurs(texte) {
  let s = texte;
  for (const [ancien, nouveau] of Object.entries(hex)) {
    s = s.replace(new RegExp(ancien, 'gi'), nouveau);
  }
  for (const [ancien, nouveau] of Object.entries(rgba)) {
    s = s.split(ancien).join(nouveau);
  }
  return s;
}

// 1. global.css : jetons puis couleurs résiduelles
const cssChemin = join(racine, 'src/styles/global.css');
let css = readFileSync(cssChemin, 'utf8');
for (const [nom, valeur] of Object.entries(jetons)) {
  css = css.replace(new RegExp(`(\\s${nom.replace(/-/g, '\\-')}:)[^;]+;`), `$1 ${valeur};`);
}
css = remplacerCouleurs(css);
writeFileSync(cssChemin, css);
console.log('global.css : jetons réécrits');

// 2. composants, pages, scripts, SVG publics
const cibles = [];
const parcourir = (dossier) => {
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (['.astro', '.svg', '.mjs'].includes(extname(entree))) cibles.push(chemin);
  }
};
parcourir(join(racine, 'src'));
cibles.push(join(racine, 'public/favicon.svg'), join(racine, 'public/logo-mark.svg'), join(racine, 'public/logo-elyostudio.svg'), join(racine, 'scripts/og.mjs'));

let touches = 0;
for (const fichier of cibles) {
  if (fichier.endsWith('palette.mjs')) continue;
  const avant = readFileSync(fichier, 'utf8');
  const apres = remplacerCouleurs(avant);
  if (apres !== avant) {
    writeFileSync(fichier, apres);
    touches += 1;
  }
}
console.log(`${touches} fichiers recolorés`);
