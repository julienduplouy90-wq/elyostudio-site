# Elyostudio

Site vitrine d'Elyostudio — agence de création de sites web pour naturopathes et praticiens du
bien-être. Construit avec [Astro](https://astro.build), en sortie 100 % statique.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321/elyostudio
npm run build    # génère dist/
npm run preview  # prévisualise le build
```

## Structure

```
src/
├─ components/     Entête, pied de page, FAQ, témoignages, CTA, icônes
├─ content/blog/   Articles en Markdown (frontmatter validé par content.config.ts)
├─ data/site.ts    Coordonnées, offres, tarifs, témoignages, FAQ — tout le contenu éditable
├─ layouts/        Layout de base (SEO, Open Graph, données structurées)
├─ pages/          Une page = un fichier .astro
└─ styles/         global.css : palette, typographie, composants
public/            Logo, favicon, robots.txt
```

Le contenu textuel des offres, tarifs, témoignages et FAQ se modifie dans **`src/data/site.ts`**
uniquement — les pages le consomment.

## Avant la mise en ligne

Tout ce qui reste à renseigner est marqué `PLACEHOLDER` ou `TODO` dans le code :

- [ ] `src/data/site.ts` — e-mail, téléphone, ville, tarifs réels
- [ ] `src/data/site.ts` — remplacer les réalisations et témoignages d'exemple (`exemple: true`)
- [ ] `src/pages/contact.astro` — `ENDPOINT_FORMULAIRE` (identifiant Formspree ou autre service)
- [ ] `src/pages/mentions-legales.astro` — raison sociale, SIRET, adresse, hébergeur
- [ ] `src/pages/confidentialite.astro` — responsable de traitement, prestataires
- [ ] `astro.config.mjs` — `site` et `base` selon l'hébergement final

## Déploiement

Le workflow `.github/workflows/deploy.yml` publie automatiquement sur GitHub Pages à chaque push
sur `main` (activer Pages → Source : GitHub Actions dans les réglages du dépôt).

Pour un hébergeur classique branché sur le dépôt (type Hostinger + Git), pointer le déploiement
sur le dossier `dist/` généré par `npm run build`.

### Passer à un nom de domaine propre

Dans `astro.config.mjs` : remplacer `site` par `https://elyostudio.fr` et **supprimer** la ligne
`base`. Mettre à jour l'URL du sitemap dans `public/robots.txt`.

## Palette

| Nom | HEX |
|---|---|
| Ardoise Forestière | `#2C3E35` |
| Vert Sauge | `#7A9E7E` |
| Ocre Solaire | `#E09F67` |
| Sable Coton | `#F6F3EE` |
