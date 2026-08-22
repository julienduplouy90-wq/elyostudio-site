// Point d'entrée des données du site.
//
// Le contenu réel vit dans les fichiers JSON voisins, qui sont ceux édités
// depuis le CMS (/admin). Ce module se contente de les exposer aux pages, pour
// que les composants n'aient jamais à savoir d'où vient le texte.
//
//   reglages.json     coordonnées, tarifs, navigation
//   accueil.json      constat, ce qui est mis en place, étapes
//   offre.json        les quatre phases, Elyo Direct, pour qui, engagements
//   faq.json          questions fréquentes (accueil et page offre)
//   realisations.json cartes de la page Réalisations

import reglages from './reglages.json';
import accueil from './accueil.json';
import offre from './offre.json';
import faq from './faq.json';
import vitrines from './realisations.json';

export const site = reglages.site;
export const prix = reglages.prix;
export const navigation = reglages.navigation;
export const villes = reglages.villes;

export const problemes = accueil.problemes;
export const solutions = accueil.solutions;
export const etapes = accueil.etapes;

export const phases = offre.phases;
export const elyoDirect = offre.elyoDirect;
export const pourQui = offre.pourQui;
export const engagements = offre.engagements;

export const faqs = faq.faqs;
export const faqsOffre = faq.faqsOffre;

export const realisations = vitrines.realisations;

/** Adresse du bouton « Démarrer » : la page de paiement dès qu'elle existe,
 *  sinon la page Démarrer du site, qui oriente vers l'échange découverte. */
export const lienDemarrer = site.lienPaiement || '/demarrer';
