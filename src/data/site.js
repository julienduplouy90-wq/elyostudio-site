// Données centrales du site. Tout ce qui se modifie souvent est ici.

export const site = {
  nom: 'Elyostudio',
  domaine: 'elyostudio.fr',
  url: 'https://elyostudio.fr',
  baseline: 'Sites internet pour naturopathes',
  promesse:
    'Le studio qui aide les naturopathes à remplir leur agenda grâce à leur site et à leur visibilité en ligne.',
  ville: 'Aureilhan',
  region: 'Hautes-Pyrénées',
  adresse: '49 avenue du Bois, 65800 Aureilhan',
  // À remplacer par contact@elyostudio.fr dès que la boîte pro est créée.
  email: 'julien.duplouy90@gmail.com',
  telephone: '06 42 46 12 41',
  telephoneLien: '+33642461241',
  agenda: 'https://tidycal.com/julienduplouy90/appel-decouverte-site',
  // Formulaires : service statique (Formspree, Web3Forms…).
  // Tant que la valeur est vide, les formulaires basculent sur un envoi par email.
  endpointFormulaire: '',
  entreprise: {
    raison: 'Julien Duplouy EI',
    siren: '904 940 889',
    activite: 'Conseil en communication et marketing digital, création de sites internet',
    tva: 'TVA non applicable, article 293 B du Code général des impôts',
  },
};

export const prix = {
  creation: '590 €',
  mensuel: '49 €',
  duree: '12 mois',
  delai: '10 jours ouvrés',
};

export const navigation = [
  { texte: 'L’offre', lien: '/offre' },
  { texte: 'La méthode', lien: '/methode' },
  { texte: 'Réalisations', lien: '/realisations' },
  { texte: 'Le journal', lien: '/blog' },
  { texte: 'À propos', lien: '/a-propos' },
];

export const problemes = [
  {
    icone: 'recherche',
    titre: 'On vous cherche, on ne vous trouve pas',
    texte:
      'Une personne tape « naturopathe » suivi de votre ville. Vous n’apparaissez pas. Elle prend rendez-vous ailleurs, sans avoir jamais su que vous existiez.',
  },
  {
    icone: 'partage',
    titre: 'Votre visibilité appartient à une plateforme',
    texte:
      'Tout repose sur un réseau social ou un annuaire. Les règles changent, votre page se noie dans le flux, et vous ne maîtrisez rien de ce qui se passe.',
  },
  {
    icone: 'agenda',
    titre: 'Votre site ne mène pas au rendez-vous',
    texte:
      'Le site existe, mais le chemin jusqu’à la prise de rendez-vous reste flou. Les visiteurs lisent, hésitent, puis repartent sans rien réserver.',
  },
];

export const solutions = [
  {
    icone: 'gabarit',
    titre: 'Un site de cinq pages pensé pour convaincre',
    texte:
      'Une structure claire qui présente votre pratique, rassure et conduit naturellement vers la prise de rendez-vous.',
  },
  {
    icone: 'document',
    titre: 'Une page par spécialité',
    texte:
      'Digestion, sommeil, périnatalité : chaque approche a sa page, lisible pour vos visiteurs comme pour Google.',
  },
  {
    icone: 'position',
    titre: 'Une fiche Google qui travaille pour vous',
    texte:
      'Création ou remise à plat de votre fiche établissement, pour exister dans les recherches locales et sur la carte.',
  },
  {
    icone: 'agenda',
    titre: 'La prise de rendez-vous en ligne',
    texte:
      'Vos futurs clients choisissent un créneau en trois clics, sans échange d’emails ni coup de téléphone à rattraper.',
  },
  {
    icone: 'horloge',
    titre: 'En ligne en dix jours ouvrés',
    texte:
      'Du questionnaire de départ à la mise en ligne, dix jours ouvrés suffisent. Sans réunion interminable.',
  },
  {
    icone: 'mobile',
    titre: 'Impeccable sur téléphone',
    texte:
      'Sept visites sur dix arrivent depuis un mobile. Le site est conçu d’abord pour l’écran de téléphone, ensuite pour l’ordinateur.',
  },
];

export const etapes = [
  {
    n: '01',
    titre: 'Un échange de 30 minutes',
    texte:
      'On parle de votre pratique, de votre patientèle et de ce que vous voulez obtenir. En visio, sans jargon et sans engagement.',
  },
  {
    n: '02',
    titre: 'Un questionnaire simple',
    texte:
      'Vous m’envoyez vos informations et vos photos grâce à un questionnaire guidé. Rien de technique, une heure de votre temps.',
  },
  {
    n: '03',
    titre: 'La création, puis votre validation',
    texte:
      'Je conçois le site, je vous le présente en vidéo, on ajuste ensemble. Rien n’est mis en ligne avant votre feu vert.',
  },
  {
    n: '04',
    titre: 'La mise en ligne et le suivi',
    texte:
      'Le site part en ligne, la fiche Google est activée. Chaque mois, je surveille, je mets à jour et je vous rends compte.',
  },
];

export const inclusCreation = [
  'Un site professionnel de cinq pages',
  'Une page dédiée à chacune de vos spécialités',
  'La création ou l’optimisation de votre fiche Google',
  'La prise de rendez-vous en ligne installée et testée',
  'Le nom de domaine et l’adresse email professionnelle',
  'Les textes rédigés avec vous, à partir de nos échanges',
  'La mise en ligne en dix jours ouvrés',
];

export const inclusMensuel = [
  'Un hébergement sécurisé et rapide',
  'La maintenance technique et les mises à jour',
  'Les sauvegardes et la surveillance du site',
  'Vos petites modifications, jusqu’à 30 minutes par mois',
  'Les statistiques essentielles, consultables quand vous voulez',
  'Une assistance par email, avec une vraie réponse',
  'Un bilan complet une fois par an',
  'Vos données et votre site récupérables à tout moment',
];

export const optionsHorsForfait = [
  {
    titre: 'La création d’une nouvelle page',
    texte: 'Une page de plus pour une nouvelle spécialité, un atelier ou un second cabinet.',
  },
  {
    titre: 'La rédaction d’articles',
    texte: 'Des articles qui répondent aux questions que se posent vos futurs clients avant de réserver.',
  },
  {
    titre: 'Une optimisation SEO suivie',
    texte: 'Un travail régulier sur la structure, les titres et les mots employés dans vos pages.',
  },
  {
    titre: 'L’animation de la fiche Google',
    texte: 'Publications, photos et réponses aux avis pour garder une fiche vivante toute l’année.',
  },
  {
    titre: 'Un accompagnement visibilité',
    texte: 'Un point régulier pour décider ensemble des prochaines actions, et les mettre en œuvre.',
  },
];

export const nonPromis = [
  'Aucune première place sur Google garantie',
  'Aucun nombre de clients garanti',
  'Pas de réseaux sociaux gérés à votre place',
  'Pas de boutique en ligne complexe',
  'Aucune promesse de soin ou de guérison',
];

export const engagements = [
  {
    icone: 'cadenas',
    titre: 'Le site vous appartient',
    texte: 'Nom de domaine, contenus, fichiers : tout est à votre nom et récupérable quand vous le souhaitez.',
  },
  {
    icone: 'etiquette',
    titre: 'Un tarif affiché',
    texte: 'Le même prix pour tout le monde, écrit noir sur blanc. Pas de devis à rallonge ni de surprise.',
  },
  {
    icone: 'personnes',
    titre: 'Un interlocuteur unique',
    texte: 'Vous m’écrivez, c’est moi qui réponds et qui fais le travail. Pas de service commercial intermédiaire.',
  },
  {
    icone: 'bouclier',
    titre: 'Aucune reconduction automatique',
    texte: 'Au bout de douze mois, l’abonnement s’arrête si vous ne demandez rien. Vous décidez de la suite.',
  },
];

export const comparatif = [
  { autre: 'Un modèle générique repeint aux couleurs du moment', elyo: 'Un site conçu pour une pratique de naturopathe' },
  { autre: 'Plusieurs interlocuteurs, des délais qui glissent', elyo: 'Une seule personne, du premier échange au suivi' },
  { autre: 'Un prix impossible à comprendre avant le devis', elyo: 'Un tarif affiché : 590 € puis 49 € par mois' },
  { autre: 'Un site que le prestataire garde en otage', elyo: 'Un site transférable, à votre nom' },
  { autre: 'La moindre modification refacturée', elyo: 'Les modifications courantes comprises' },
];

export const faqs = [
  {
    q: 'Puis-je créer mon site moi-même sur Wix ou Squarespace ?',
    a: 'Oui, tout à fait, et certaines naturopathes le font très bien. La vraie question est le temps que vous y passez et le résultat sur Google. Je prends en charge la technique, la rédaction et la visibilité locale pour que vous restiez concentrée sur votre cabinet.',
  },
  {
    q: 'Pourquoi un engagement de douze mois ?',
    a: 'Douze mois, c’est le temps nécessaire pour installer une présence stable : hébergement, maintenance, sauvegardes, surveillance et assistance. C’est aussi ce qui permet d’afficher un tarif de création à 590 € plutôt qu’à quatre chiffres.',
  },
  {
    q: 'Que se passe-t-il après les douze mois ?',
    a: 'Le site vous appartient. Sans demande de votre part, l’abonnement s’arrête : aucune reconduction automatique. Vous pouvez reprendre l’hébergement de votre côté ou continuer le suivi mois par mois.',
  },
  {
    q: 'Et si je n’ai ni textes ni photos ?',
    a: 'C’est le cas le plus fréquent, et c’est prévu. Je rédige les textes avec vous à partir de nos échanges. Pour les photos, je vous indique précisément quoi prendre, et je peux m’appuyer sur des images professionnelles adaptées à votre univers.',
  },
  {
    q: 'Combien de temps avant d’apparaître sur Google ?',
    a: 'Le site est en ligne en dix jours ouvrés. Apparaître dans les recherches locales prend ensuite quelques semaines, parfois davantage selon la concurrence de votre ville. Je travaille la structure et la fiche Google pour vous donner les meilleures chances.',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui. Je suis basé à Aureilhan, près de Tarbes, et j’accompagne des naturopathes partout en France, en visio et par email. Le suivi se fait à distance, sans contrainte géographique.',
  },
  {
    q: 'Pouvez-vous reprendre mon site existant ?',
    a: 'Oui. Quand un site existe déjà, je garde ce qui fonctionne et je corrige ce qui bloque. L’audit vidéo gratuit sert justement à vous dire ce qui vaut la peine d’être repris et ce qu’il vaut mieux refaire.',
  },
  {
    q: 'Garantissez-vous un nombre de clients ?',
    a: 'Non, et je m’en méfie quand on vous le promet. Personne ne peut garantir des rendez-vous sur Google. Je mets en place un dispositif complet et honnête, je vous explique ce qu’il fait ; le reste dépend de votre pratique et de votre secteur.',
  },
];

export const realisations = [
  {
    titre: 'Naturopathe à Tarbes',
    sujet: 'Troubles digestifs et fatigue chronique',
    texte:
      'Site de démonstration en cinq pages : une page par spécialité, une fiche Google complétée et une prise de rendez-vous accessible depuis chaque écran.',
    points: ['5 pages', 'Fiche Google', 'Rendez-vous en ligne'],
    teinte: 'vert',
  },
  {
    titre: 'Naturopathe à Pau',
    sujet: 'Sommeil et périodes de transition',
    texte:
      'La même approche, déclinée sur un univers plus doux. Pensé mobile d’abord, avec un bouton de rendez-vous visible en permanence sur téléphone.',
    points: ['Mobile d’abord', 'Bouton flottant', 'Blog intégré'],
    teinte: 'terre',
  },
  {
    titre: 'Sophrologue à Bordeaux',
    sujet: 'Gestion du stress et accompagnement',
    texte:
      'Une variante pour une pratique voisine : mise en avant des séances, tarifs lisibles et parcours de réservation raccourci.',
    points: ['Tarifs lisibles', 'Séances en ligne', 'Avis clients'],
    teinte: 'ambre',
  },
];
