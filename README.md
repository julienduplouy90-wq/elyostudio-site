# ElyoStudio — site de l'agence

Site vitrine d'**ElyoStudio**, le studio de Julien Duplouy qui crée des sites internet pour les
naturopathes. Astro 5, sortie 100 % statique, aucune base de données, aucun backend.

- Adresse de production : <https://elyostudio.fr>
- Dépôt : <https://github.com/julienduplouy90-wq/elyostudio-site> (public) — branche de travail `claude/site-astro`, déploiement automatique depuis `main`
- Ce dossier est un **worktree git** du dépôt `elyostudio` (le `.git` pointe vers
  `../elyostudio/.git/worktrees/elyostudio-astro`). Les autres versions du site vivent sur les
  branches `claude/site-horizons` (React/Vite + PocketBase) et `claude/site-initial`.

## Démarrer

```bash
npm install
npm run dev
```

| Commande                    | Effet                                          |
| --------------------------- | ---------------------------------------------- |
| `npm run dev`               | Serveur de développement (http://localhost:4321) |
| `npm run build`             | Génère le site statique dans `dist/`            |
| `npm run preview`           | Prévisualise le contenu de `dist/`              |
| `node scripts/og.mjs`       | Régénère l'image de partage `public/og-elyostudio.png` |
| `node scripts/typographie.mjs` | Applique les espaces insécables françaises aux fichiers de `src/` |
| `node scripts/audit-meta.mjs` | Contrôle la longueur des title/meta et les signaux SEO de `dist/` |

## Structure

```
src/
├─ data/site.js            → coordonnées, tarifs, offre, FAQ, réalisations (à éditer en priorité)
├─ styles/global.css       → charte : couleurs, rayons, ombres, boutons, cartes, animations
├─ layouts/Base.astro      → en-tête HTML, SEO, en-tête/pied de page, barre d'appel mobile
├─ components/             → Entete, Pied, Logo, Maquette, BandeCta, Formulaire, EnPage, Icone
├─ content/articles/*.md   → les articles du journal (front-matter + markdown)
└─ pages/                  → une page = un fichier
public/                    → logo, favicon, image de partage, robots.txt, CNAME
```

### Modifier le contenu courant

- **Tarifs, email, téléphone, agenda, textes de l'offre, FAQ** : `src/data/site.js`.
- **Ajouter un article** : créer `src/content/articles/mon-article.md` avec le même front-matter
  qu'un article existant. L'URL devient `/blog/mon-article`.
- **Couleurs, rayons, ombres** : les variables en haut de `src/styles/global.css`.

## Identité

| Élément            | Valeur                                                       |
| ------------------ | ------------------------------------------------------------ |
| Vert profond       | `#2E5A4B` — couleur principale, texte de marque              |
| Terracotta         | `#B8552F` (dégradé vers `#9C4525`) — appels à l'action        |
| Ambre              | `#E8A85C` — halos, accents chauds                             |
| Crème              | `#FCF8F2` / `#F6EEE3` — fonds                                 |
| Encre              | `#23201C` — texte                                             |
| Titres             | Newsreader Variable (axe opsz), auto-hébergée                 |
| Textes             | Inter Variable, auto-hébergée                                 |

Le logo est un **soleil levant** : un demi-disque terracotta posé sur une ligne d'horizon verte,
avec trois rayons. Déclinaisons dans `public/` : `logo-elyostudio.svg` (logo + nom),
`logo-mark.svg` (symbole seul), `favicon.svg` (symbole sur pastille verte),
`og-elyostudio.png` (image de partage 1200 × 630).

Aucune police n'est chargée depuis un serveur tiers, aucun cookie n'est déposé : pas de bandeau de
consentement nécessaire.

## Formulaires

Les formulaires (audit gratuit, contact) sont **statiques**. Deux modes :

1. `site.endpointFormulaire` **vide** (par défaut) : à l'envoi, le navigateur ouvre un email
   pré-rempli vers `site.email`, puis renvoie vers `/merci`.
2. `site.endpointFormulaire` **renseigné** (Formspree, Web3Forms, Basin…) : le formulaire poste
   directement vers ce service, sans JavaScript.

Un champ piège (`_gotcha`) filtre les robots.

## Déploiement

Voir [DEPLOIEMENT.md](DEPLOIEMENT.md).
