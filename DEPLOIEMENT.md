# Mise en ligne d'elyostudio.fr

Le site est entièrement statique : `npm run build` produit un dossier `dist/` qu'on peut déposer
n'importe où. Deux chemins possibles.

## Option A — GitHub Pages (gratuit, automatique)

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque `push` sur `main`.

1. **Créer le dépôt** (il doit être **public** : les Pages avec domaine personnalisé ne sont
   gratuites que sur les dépôts publics).

   ```bash
   gh repo create julienduplouy90-wq/elyostudio-site --public --source . --remote origin
   ```

2. **Pousser la branche puis fusionner dans `main`** — jamais de commit direct sur `main` :

   ```bash
   git push -u origin claude/site-astro
   gh pr create --fill
   ```

3. **Activer Pages** : dans `Settings → Pages`, choisir la source **GitHub Actions**.

4. **Domaine personnalisé** : le fichier `public/CNAME` contient déjà `elyostudio.fr`. Chez le
   registrar du domaine, créer :

   | Type  | Nom   | Valeur                    |
   | ----- | ----- | ------------------------- |
   | A     | `@`   | `185.199.108.153`         |
   | A     | `@`   | `185.199.109.153`         |
   | A     | `@`   | `185.199.110.153`         |
   | A     | `@`   | `185.199.111.153`         |
   | CNAME | `www` | `julienduplouy90-wq.github.io.` |

   Puis cocher **Enforce HTTPS** une fois le certificat émis (quelques minutes à quelques heures).

## Option B — Hostinger (hébergement déjà payé)

```bash
npm run build
```

Puis envoyer le **contenu** de `dist/` (pas le dossier lui-même) dans `public_html/`, par FTP ou
par le gestionnaire de fichiers hPanel.

Si vous prenez cette option :

- supprimez `public/CNAME` (inutile hors GitHub Pages) ;
- mettez à jour la section « Hébergement » de `src/pages/mentions-legales.astro` avec les
  coordonnées de Hostinger (elles y sont déjà en note) ;
- pensez à forcer le HTTPS et la redirection `www` → apex dans hPanel.

## Après la première mise en ligne

1. **Search Console** : ajouter la propriété `elyostudio.fr`, puis soumettre
   `https://elyostudio.fr/sitemap-index.xml`.
2. **Fiche Google** : la fiche de l'agence doit pointer vers le site.
3. **Formulaires** : brancher un service d'envoi (Formspree, Web3Forms) et renseigner
   `endpointFormulaire` dans `src/data/site.js`, sinon les demandes passent par un email
   pré-rempli côté visiteur.
4. **Email pro** : remplacer `julien.duplouy90@gmail.com` par `contact@elyostudio.fr` dans
   `src/data/site.js` dès que la boîte existe.
5. **Vérifier l'agenda** : le lien TidyCal annonce actuellement un appel de **15 minutes à 1 $**,
   alors que le site parle d'un appel découverte de 30 minutes offert. Aligner l'un ou l'autre.

## Recette avant publication

- [ ] Relire les mentions légales, la politique de confidentialité et les CGV (les CGV portent
      encore un avertissement « à faire vérifier »).
- [ ] Vérifier les trois cartes de la page Réalisations : ce sont des démonstrations, pas des
      clientes réelles. Les remplacer par de vraies captures dès qu'un accord client existe.
- [ ] Relire la page À propos : le parcours y est raconté de façon volontairement générale.
- [ ] Tester le formulaire de contact en conditions réelles.
- [ ] Passer une mesure PageSpeed sur l'accueil et sur un article.
