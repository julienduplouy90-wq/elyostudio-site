# Mise en ligne d'elyostudio.fr

Le site est entièrement statique : `npm run build` produit un dossier `dist/` qu'on peut déposer
n'importe où.

## État actuel (19 août 2026)

| Élément                              | État                                                                 |
| ------------------------------------ | -------------------------------------------------------------------- |
| Dépôt GitHub                         | ✅ `julienduplouy90-wq/elyostudio-site` (public, branche `main`)      |
| Construction et déploiement          | ✅ automatique à chaque `push` sur `main` (`.github/workflows/deploy.yml`) |
| GitHub Pages                         | ✅ activé, source « GitHub Actions », premier déploiement réussi      |
| Domaine personnalisé                 | ✅ `elyostudio.fr` déclaré côté GitHub                                 |
| **DNS**                              | ❌ **reste à faire** — le domaine pointe encore vers le parking Hostinger |
| Certificat HTTPS                     | ⏳ émis automatiquement par GitHub une fois le DNS en place            |

Autrement dit : **il ne manque que les enregistrements DNS.** Le site est déjà servi par GitHub
pour l'hôte `elyostudio.fr`, il attend simplement que le domaine pointe vers lui.

## L'étape qui reste : les DNS chez Hostinger

Dans hPanel → **Domaines → elyostudio.fr → Zone DNS**, supprimer l'enregistrement `A` existant
(`@` → `2.57.91.91`, le parking) et créer :

| Type  | Nom   | Valeur                          | TTL      |
| ----- | ----- | ------------------------------- | -------- |
| A     | `@`   | `185.199.108.153`               | 3600     |
| A     | `@`   | `185.199.109.153`               | 3600     |
| A     | `@`   | `185.199.110.153`               | 3600     |
| A     | `@`   | `185.199.111.153`               | 3600     |
| CNAME | `www` | `julienduplouy90-wq.github.io.` | 3600     |

Ne touchez pas aux enregistrements `MX` : l'email n'est pas concerné.

Propagation : de quelques minutes à quelques heures. Ensuite, dans le dépôt →
**Settings → Pages**, cocher **Enforce HTTPS** dès que la case devient active (le certificat
Let's Encrypt est émis automatiquement).

## Publier une modification

```bash
git add -A
git commit -m "..."
git push origin claude/site-astro          # puis PR vers main
```

Le workflow reconstruit et redéploie tout seul à la fusion dans `main`.

## Solution de repli : Hostinger

Si vous préférez rester sur l'hébergement Hostinger déjà payé plutôt que GitHub Pages :

```bash
npm run build
```

Envoyer le **contenu** de `dist/` (pas le dossier) dans `public_html/`, par FTP ou par le
gestionnaire de fichiers hPanel. Dans ce cas :

- laisser les DNS tels quels ;
- supprimer `public/CNAME` et le domaine personnalisé côté GitHub ;
- mettre à jour la section « Hébergement » de `src/pages/mentions-legales.astro` (les coordonnées
  de Hostinger y sont déjà en note).

## Après la mise en ligne

1. **Search Console** : ajouter la propriété `elyostudio.fr`, puis soumettre
   `https://elyostudio.fr/sitemap-index.xml`.
2. **Fiche Google** : faire pointer la fiche de l'agence vers le site.
3. **Formulaires** : brancher un service d'envoi (Formspree, Web3Forms) et renseigner
   `endpointFormulaire` dans `src/data/site.js`, sinon les demandes passent par un email
   pré-rempli côté visiteur.
4. **Email pro** : remplacer `julien.duplouy90@gmail.com` par `contact@elyostudio.fr` dans
   `src/data/site.js` dès que la boîte existe.
5. **Vérifier l'agenda** : le lien TidyCal annonce actuellement un appel de **15 minutes à 1 $**,
   alors que le site parle d'un appel découverte de 30 minutes offert. Aligner l'un ou l'autre.

## Recette

- [ ] Relire les mentions légales, la politique de confidentialité et les CGV (les CGV portent
      encore un avertissement « à faire vérifier »).
- [ ] Vérifier les trois cartes de la page Réalisations : ce sont des démonstrations, pas des
      clientes réelles. Les remplacer par de vraies captures dès qu'un accord client existe.
- [ ] Relire la page À propos : le parcours y est raconté de façon volontairement générale.
- [ ] Tester le formulaire de contact en conditions réelles.
- [ ] Passer une mesure PageSpeed sur l'accueil et sur un article.
