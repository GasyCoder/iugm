import type {
  AdmissionStep,
  BusinessOffer,
  KeyFigure,
  NewsCategory,
  NewsItem,
  PedagogyStep,
  Pillar,
  StudentProject,
  Testimonial,
  TestimonialCategory,
} from '~/types/content'
import { media } from '~/data/media'

/**
 * Contenus de la page d'accueil repris du prototype Claude Design (Accueil v2).
 * Textes éditoriaux du prototype : à valider par l'IUGM avant publication.
 */

export const hero = {
  title: 'Former aujourd’hui les acteurs du développement de demain.',
  tagline: 'Des compétences ancrées dans nos territoires, ouvertes sur le monde.',
}

export const manifesto = {
  quote: '« À l’IUGM, la gestion ne s’apprend pas uniquement dans les livres. Elle s’expérimente, se pratique et se confronte aux réalités économiques. »',
}

export const pillars: Pillar[] = [
  { number: '01', title: 'Apprendre par projets', description: 'Études de marché, création de marques, plans d’affaires : on apprend en travaillant sur des cas concrets.' },
  { number: '02', title: 'Entreprendre', description: 'Imaginer un produit, le tester, le présenter. L’esprit d’entreprendre fait partie de la formation.' },
  { number: '03', title: 'Se professionnaliser', description: 'Stages, intervenants du monde professionnel et projets avec les entreprises préparent à l’insertion.' },
]

/** Aucun chiffre inventé : « XX » jusqu'à communication par l'IUGM. */
export const keyFigures: KeyFigure[] = [
  { value: 'XX+', label: 'étudiants', status: 'pending' },
  { value: '3', label: 'sites en région', status: 'brochure' },
  { value: 'XX', label: 'formations', status: 'pending' },
  { value: 'XX', label: 'promotions', status: 'pending' },
  { value: 'XX', label: 'diplômés', status: 'pending' },
  { value: 'XX', label: 'partenaires', status: 'pending' },
]

/** Procédure indicative (brochures) : non officielle tant qu'elle n'est pas validée. */
export const admissions = {
  summary: 'Établissement public · Bourse et logement',
  summaryStatus: 'brochure' as const,
  steps: [
    { title: 'Choisir sa formation', description: 'Vérifier les séries de bac acceptées pour le parcours.', status: 'brochure' },
    { title: 'Déposer son dossier', description: 'L’admission se fait sur sélection de dossiers.', status: 'brochure' },
    { title: 'Résultats et inscription', description: 'Calendrier à communiquer par l’IUGM.', status: 'pending' },
  ] satisfies AdmissionStep[],
}

export const pedagogySteps: PedagogyStep[] = [
  { number: '01', verb: 'Apprendre', description: 'Les fondamentaux de la gestion, de l’économie et du management.' },
  { number: '02', verb: 'Expérimenter', description: 'Cas pratiques, simulations et études de terrain.' },
  { number: '03', verb: 'Entreprendre', description: 'Créer un produit, une marque, un projet.' },
  { number: '04', verb: 'Collaborer', description: 'Travail en équipe, présentations, échanges avec les entreprises.' },
  { number: '05', verb: 'Se professionnaliser', description: 'Stages et préparation à l’insertion professionnelle.' },
]

export const studentProjects: StudentProject[] = [
  { id: 'produit', type: 'Création de produit', photoSubject: 'prototype présenté par les étudiants', status: 'pending' },
  { id: 'etude-marche', type: 'Étude de marché', photoSubject: 'enquête de terrain', status: 'pending' },
  { id: 'marque', type: 'Création de marque', photoSubject: 'identité créée en équipe', status: 'pending' },
  { id: 'territorial', type: 'Projet territorial', photoSubject: 'projet avec une commune', status: 'pending' },
]

export const businessOffers: BusinessOffer[] = [
  { title: 'Stages', description: 'Accueillir un étudiant en Licence ou en Master.' },
  { title: 'Offres d’emploi', description: 'Diffuser vos offres auprès des diplômés.' },
  { title: 'Interventions', description: 'Partager votre expérience en cours.' },
  { title: 'Recrutement', description: 'Rencontrer les promotions sortantes.' },
  { title: 'Partenariats', description: 'Projets, études et collaborations.' },
  { title: 'Mentorat', description: 'Accompagner un étudiant ou un projet.' },
]

/** Emplacements de logos : aucun partenaire documenté à ce jour. */
export const partnerSlotCount = 5

export const testimonialCategoryLabels: Record<TestimonialCategory, string> = {
  graduate: 'Diplômés',
  student: 'Étudiants',
  entrepreneur: 'Entrepreneurs',
  partner: 'Partenaires',
}

/** Emplacements de témoignages : à recueillir auprès des personnes, avec leur accord écrit. */
export const testimonials: Testimonial[] = [
  { id: 'diplome', category: 'graduate', quote: '« Témoignage réel à recueillir auprès d’un diplômé, avec son accord écrit. »', author: 'Prénom Nom', role: 'Promotion [XXXX] · Poste, entreprise', status: 'pending' },
  { id: 'etudiant', category: 'student', quote: '« Citation d’un étudiant en Licence. »', author: 'Prénom Nom', role: 'L3 [parcours]', status: 'pending' },
  { id: 'partenaire', category: 'partner', quote: '« Citation d’un partenaire recruteur. »', author: 'Prénom Nom', role: 'Fonction, entreprise', status: 'pending' },
]

export const newsCategoryLabels: Record<NewsCategory, string> = {
  alumni: 'Alumni',
  formation: 'Formation',
  event: 'Événements',
}

/** Actualités du prototype : dates et noms de promotions non confirmés. */
export const news: NewsItem[] = [
  {
    id: 'remise-diplomes',
    category: 'alumni',
    title: 'Remise des diplômes : les promotions Hery Miray, Mahiratra et Santatra à l’honneur',
    image: { ...media.graduation, alt: 'Diplômés IUGM en toge lors de la remise des diplômes' },
    imagePosition: '50% 75%',
    status: 'pending',
  },
  {
    id: 'formation-distance',
    category: 'formation',
    title: 'Formation à distance : parcours Licence et Master',
    image: { ...media.teamStand, alt: 'Stand IUGM présentant la formation à distance' },
    imagePosition: '25% 50%',
    status: 'pending',
  },
  {
    id: 'salon',
    category: 'event',
    title: 'L’IUGM présente ses formations au salon [nom de l’événement]',
    image: { ...media.fairStand, alt: 'Équipe IUGM sur son stand' },
    imagePosition: '50% 30%',
    status: 'pending',
  },
]
