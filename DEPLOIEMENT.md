# Mise en ligne d'elyostudio.fr

Le site est en ligne sur **https://elyostudio.fr**, hébergé par GitHub Pages, en sortie 100 %
statique.

## Installation actuelle (19 août 2026)

| Élément                   | État                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| Dépôt                     | `julienduplouy90-wq/elyostudio-site` (public, branche `main`)            |
| Construction et livraison | automatiques à chaque `push` sur `main` (`.github/workflows/deploy.yml`) |
| GitHub Pages              | source « GitHub Actions »                                                |
| Domaine                   | `elyostudio.fr`, déclaré côté GitHub et dans `public/CNAME`               |
| Certificat HTTPS          | émis, **Enforce HTTPS activé** — `http://` redirige en 301 vers `https://` |

Zone DNS chez Hostinger (les serveurs de noms restent ceux de Hostinger) :

| Type  | Nom   | Valeur                        | TTL |
| ----- | ----- | ----------------------------- | --- |
| A     | `@`   | `185.199.108.153`             | 300 |
| A     | `@`   | `185.199.109.153`             | 300 |
| A     | `@`   | `185.199.110.153`             | 300 |
| A     | `@`   | `185.199.111.153`             | 300 |
| CNAME | `www` | `julienduplouy90-wq.github.io` | 300 |

Aucun enregistrement MX : le domaine ne porte pas d'email pour l'instant.

## Publier une modification

```bash
git add -A
git commit -m "..."
git push origin claude/site-astro
```

Puis ouvrir une pull request vers `main` (`gh pr create --fill`). À la fusion, le workflow
reconstruit et redéploie tout seul en une à deux minutes.

## Revenir en arrière

- **Revenir à une version précédente du site** : `git revert <commit>` puis pousser sur `main`.
- **Rendre le domaine à Hostinger** : remettre un enregistrement A `@` vers `2.57.91.91` et
  supprimer les quatre A de GitHub.
- **Basculer sur l'hébergement Hostinger** : `npm run build`, envoyer le contenu de `dist/` dans
  `public_html/`, supprimer `public/CNAME` et le domaine personnalisé côté GitHub, puis mettre à
  jour la section « Hébergement » de `src/pages/mentions-legales.astro` (les coordonnées de
  Hostinger y sont déjà en note).

## Ce qu'il reste à faire

1. **www** : le CNAME est en place ; GitHub doit encore inclure `www.elyostudio.fr` dans le
   certificat. Si `https://www.elyostudio.fr` échoue encore après une heure, retirer puis remettre
   le domaine personnalisé dans Settings → Pages pour relancer l'émission.
2. **Search Console** : ajouter la propriété `elyostudio.fr` et soumettre
   `https://elyostudio.fr/sitemap-index.xml`.
3. **Fiche Google** : faire pointer la fiche de l'agence vers le site.
4. **Formulaires** : brancher un service d'envoi (Formspree, Web3Forms) et renseigner
   `endpointFormulaire` dans `src/data/site.js`, sinon les demandes passent par un email
   pré-rempli côté visiteur.
5. **Email pro** : remplacer `julien.duplouy90@gmail.com` par `contact@elyostudio.fr` dans
   `src/data/site.js` dès que la boîte existe.
6. **Agenda** : le lien TidyCal annonce un appel de **15 minutes à 1 $**, alors que le site parle
   d'un appel découverte de 30 minutes offert. Aligner l'un ou l'autre.

## Recette

- [ ] Relire les mentions légales, la politique de confidentialité et les CGV (les CGV portent
      encore un avertissement « à faire vérifier »).
- [ ] Vérifier les trois cartes de la page Réalisations : ce sont des démonstrations, pas des
      clientes réelles. Les remplacer par de vraies captures dès qu'un accord client existe.
- [ ] Relire la page À propos : le parcours y est raconté de façon volontairement générale.
- [ ] Tester le formulaire de contact en conditions réelles.
- [ ] Passer une mesure PageSpeed sur l'accueil et sur un article.
