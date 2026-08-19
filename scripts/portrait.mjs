// Fabrique le portrait rond de Julien déposé dans public/images/.
//
// Comme scripts/polices.mjs, ce script n'est pas lancé par le build : les
// fichiers produits sont versionnés. On le relance à la main si la photo
// change :
//
//   npm install --no-save sharp
//   node scripts/portrait.mjs
//
// La photo d'origine (src/photos/julien-source.png, 800×800) porte un décor
// incrusté : fond bleu-canard carré, anneau crème à r≈390, arc doré et deux
// pastilles à r≈333-372. Aucune de ces couleurs n'appartient à la charte, et
// le canard jure franchement avec le crème du site. On découpe donc un disque
// de rayon 305 centré sur (395,5 ; 396,5) — sous le décor, avec du dégagement
// au-dessus des cheveux — et on redessine le cadre en CSS avec les jetons du
// site, ce qui le garde net à toutes les tailles.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(racine, 'src/photos/julien-source.png');
const sortie = join(racine, 'public/images');
mkdirSync(sortie, { recursive: true });

const centreX = 395.5;
const centreY = 396.5;
const rayon = 305;
const côté = rayon * 2;

const zone = {
  left: Math.round(centreX - rayon),
  top: Math.round(centreY - rayon),
  width: côté,
  height: côté,
};

// Masque circulaire : le fichier est livré détouré, donc pas de coin à
// masquer en CSS ni de liseré au raccord.
const masque = Buffer.from(
  `<svg width="${côté}" height="${côté}"><circle cx="${côté / 2}" cy="${côté / 2}" r="${côté / 2}" fill="#fff"/></svg>`,
);

// Voile vert du site sur le pourtour seulement : c'est le bord qui touche la
// page, donc là que l'œil compare. Le visage n'est pas touché — virer la
// teinte de toute l'image verdirait la peau.
const voile = Buffer.from(
  `<svg width="${côté}" height="${côté}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="v" cx="50%" cy="44%" r="60%">
      <stop offset="50%" stop-color="#2E5A4B" stop-opacity="0"/>
      <stop offset="100%" stop-color="#2E5A4B" stop-opacity="0.16"/>
    </radialGradient></defs>
    <rect width="${côté}" height="${côté}" fill="url(#v)"/>
  </svg>`,
);

const base = await sharp(source)
  .extract(zone)
  .modulate({ saturation: 1.05 })
  .linear([1.02, 1, 0.97], [0, 0, 0]) // réchauffement léger, vers le crème et le terracotta
  .composite([
    { input: voile, blend: 'over' },
    { input: masque, blend: 'dest-in' },
  ])
  .png()
  .toBuffer();

for (const largeur of [440, 220, 112]) {
  const fichier = join(sortie, `julien-duplouy-${largeur}.webp`);
  const info = await sharp(base)
    .resize(largeur, largeur, { fit: 'cover' })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(fichier);
  console.log(`julien-duplouy-${largeur}.webp`.padEnd(28), String(info.size).padStart(6), 'o');
}
