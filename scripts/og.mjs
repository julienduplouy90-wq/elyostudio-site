// Génère public/og-elyostudio.png (1200x630) à partir d'un SVG.
// Lancer avec : node scripts/og.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fond" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FDFAF5"/>
      <stop offset="1" stop-color="#F3E9DB"/>
    </linearGradient>
    <linearGradient id="terre" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#C25E36"/>
      <stop offset="1" stop-color="#9C4525"/>
    </linearGradient>
    <radialGradient id="halo1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#E8A85C" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#E8A85C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#2E5A4B" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#2E5A4B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#fond)"/>
  <circle cx="1080" cy="90" r="300" fill="url(#halo1)"/>
  <circle cx="90" cy="600" r="260" fill="url(#halo2)"/>

  <!-- Marque -->
  <g transform="translate(84 62) scale(1.3)">
    <path d="M17 43 A15 15 0 0 1 47 43 Z" fill="#C25E36"/>
    <g fill="none" stroke="#2E5A4B" stroke-width="4.6" stroke-linecap="round">
      <path d="M32 12 V19"/>
      <path d="M13 21 L18 26"/>
      <path d="M51 21 L46 26"/>
      <path d="M8 47.5 H56"/>
    </g>
  </g>
  <text x="200" y="128" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="bold" fill="#23201C">Elyostudio</text>

  <!-- Titre -->
  <text x="88" y="286" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="bold" fill="#23201C">Sites internet pour</text>
  <text x="88" y="374" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="bold" fill="#2E5A4B">naturopathes</text>

  <text x="88" y="440" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#5A5048">Plus de rendez-vous grâce à un site clair et une fiche Google tenue.</text>

  <!-- Pastille tarif -->
  <g>
    <rect x="88" y="492" width="530" height="72" rx="36" fill="url(#terre)"/>
    <text x="128" y="538" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="bold" fill="#FFF6F1">590 € puis 49 €/mois — en 10 jours</text>
  </g>

  <text x="1112" y="566" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="bold" fill="#7A6C5E">elyostudio.fr</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og-elyostudio.png', import.meta.url), png);
console.log('public/og-elyostudio.png généré :', png.length, 'octets');
