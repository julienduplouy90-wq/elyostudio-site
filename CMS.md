# Modifier le site sans toucher au code

Le site dispose d'un tableau de bord à l'adresse **<https://elyostudio.fr/admin/>**.
Il s'agit de [Sveltia CMS](https://sveltiacms.app), auto-hébergé : rien n'est installé
sur un serveur tiers, l'interface est un simple fichier servi avec le site.

## Comment ça marche

1. Vous modifiez un texte dans le tableau de bord, puis vous enregistrez.
2. Le CMS écrit directement dans le dépôt GitHub (un commit par enregistrement).
3. GitHub Actions reconstruit le site et le met en ligne.

**Comptez une minute entre « Enregistrer » et la mise en ligne.** Ce n'est pas
instantané au sens strict : le site est composé de pages statiques, ce qui le rend
très rapide et très solide, au prix de cette reconstruction. L'avancement est visible
sur la page [Actions du dépôt](https://github.com/julienduplouy90-wq/elyostudio-site/actions).

## Se connecter la première fois

Le plus simple, sans rien installer :

1. Sur GitHub, ouvrir **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**.
2. Renseigner :
   - **Repository access** : *Only select repositories* → `elyostudio-site`
   - **Permissions → Repository permissions → Contents** : *Read and write*
   - **Expiration** : au choix (un an, par exemple — il faudra le régénérer ensuite)
3. Copier le jeton affiché (il ne sera plus jamais montré).
4. Sur <https://elyostudio.fr/admin/>, cliquer **« Se connecter avec un jeton d'accès »**
   et coller le jeton.

Le navigateur le garde en mémoire : la connexion n'est à refaire qu'en cas de
changement d'appareil ou d'expiration. Le tableau de bord fonctionne aussi bien sur
téléphone que sur ordinateur.

### Variante : bouton « Se connecter avec GitHub » en un clic

Elle demande une application OAuth GitHub et un petit worker Cloudflare gratuit
([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)). Une fois déployé,
décommenter la ligne `base_url` dans `public/admin/config.yml` avec l'adresse du
worker. Le même worker peut servir tous les sites clients — c'est le chemin à prendre
le jour où une naturopathe éditera son propre site.

## Ce qui est modifiable

| Section du tableau de bord | Fichier | Contenu |
| --- | --- | --- |
| **Articles du journal** | `src/content/articles/*.md` | Les articles du blog : titre, description, catégorie, date, contenu. Le bouton « Nouveau » crée un article complet. |
| **Réglages du site** | `src/data/reglages.json` | Email, téléphone, adresse, lien de l'agenda, tarifs, menu principal, mentions légales. |
| **Contenu des pages → Accueil** | `src/data/accueil.json` | Les trois cartes du constat, les six du dispositif, les quatre étapes de la méthode. |
| **Contenu des pages → Offre** | `src/data/offre.json` | Ce qui est compris à la création et chaque mois, les options, les engagements, le comparatif. |
| **Contenu des pages → FAQ** | `src/data/faq.json` | Les questions de l'accueil et celles de la page offre. |
| **Contenu des pages → Réalisations** | `src/data/realisations.json` | Les trois exemples affichés. |

Les tarifs sont écrits à un seul endroit (`Réglages → Tarifs`) et se répercutent
partout : accueil, offre, pied de page, textes SEO.

### Ce qui n'est pas dans le CMS

Les titres de sections, les textes des pages Méthode, À propos, Contact et les pages
légales restent dans le code. C'est volontaire : ce sont des textes structurants,
rarement modifiés. Dites-le-moi si vous voulez qu'ils passent aussi dans le CMS.

## Modifier depuis son ordinateur, sans connexion GitHub

```bash
npx @sveltia/cms-proxy-server
```

Puis, dans un second terminal, `npm run dev` et ouvrir <http://localhost:4321/admin/>.
Le CMS écrit alors dans les fichiers locaux ; il reste à faire `git push` pour publier.

## En cas d'erreur

- **« Une erreur s'est produite lors de l'analyse d'un fichier »** : un fichier JSON a
  été cassé à la main. Le dépôt garde tout l'historique, on revient en arrière avec
  `git revert`.
- **La modification n'apparaît pas** : vérifier que le déploiement est vert dans
  [Actions](https://github.com/julienduplouy90-wq/elyostudio-site/actions), puis
  recharger la page en vidant le cache.
- **Le tableau de bord ne charge pas** : `public/admin/sveltia-cms.js` est recopié
  automatiquement depuis `node_modules` avant chaque build. S'il manque en local,
  lancer `node scripts/copier-cms.mjs`.
