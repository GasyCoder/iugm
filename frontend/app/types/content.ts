/**
 * Statut de vérification d'une donnée institutionnelle.
 * - verified : validée par l'IUGM ;
 * - brochure : reprise d'un support IUGM (brochure), à confirmer pour le site ;
 * - pending  : non sourcée, jamais affichée au public.
 */
export type VerificationStatus = 'verified' | 'brochure' | 'pending'

/**
 * - cleared : accord écrit des ayants droit obtenu ;
 * - project-approved : publication demandée par le responsable du projet, accord écrit à joindre ;
 * - pending : non publiable.
 */
export type MediaRightsStatus = 'cleared' | 'project-approved' | 'pending'

export interface MediaImage {
  /** Nom du fichier conservé dans les ressources locales de conception, pas une URL publique. */
  source: string
  /** Faux tant que le fichier ne peut pas être distribué avec le frontend. */
  assetAvailable: boolean
  alt: string
  width: number
  height: number
  /** Crédit photo lu dans les métadonnées du fichier source, le cas échéant. */
  credit?: string
  rights: MediaRightsStatus
}

export interface HeroSlide {
  key: string
  /** Début du chemin des fichiers publiés : `{base}-{largeur}.webp`. */
  base: string
  image: MediaImage
  title: string
  subtitle: string
  /** Cadrage CSS object-position. */
  position: string
}

export interface DirectorMessage {
  /** `null` tant que le texte n'est pas transmis par l'IUGM. */
  quote: string | null
  author: string | null
  role: string | null
  /** `base` : début du chemin des fichiers `{base}-{largeur}.webp`. */
  photo: { base: string, alt: string, width: number, height: number } | null
  status: VerificationStatus
}

export interface Pillar {
  number: string
  title: string
  description: string
}

export interface KeyFigure {
  /** « XX » tant que la valeur n'est pas fournie par l'IUGM. */
  value: string
  label: string
  status: VerificationStatus
}

export interface AdmissionStep {
  title: string
  description: string
  status: VerificationStatus
}

export interface PedagogyStep {
  number: string
  verb: string
  description: string
}

export interface StudentProject {
  id: string
  type: string
  /** Sujet de la photo attendue (placeholder). */
  photoSubject: string
  status: VerificationStatus
}

export interface BusinessOffer {
  title: string
  description: string
}

export type TestimonialCategory = 'graduate' | 'student' | 'entrepreneur' | 'partner'

export interface Testimonial {
  id: string
  category: TestimonialCategory
  quote: string
  author: string
  role: string
  status: VerificationStatus
}

export type NewsCategory = 'alumni' | 'formation' | 'event'

export interface NewsItem {
  id: string
  category: NewsCategory
  title: string
  /** ISO-8601 ; absente tant que la date n'est pas confirmée. */
  date?: string
  image: MediaImage
  /** Cadrage CSS object-position de la photo. */
  imagePosition: string
  status: VerificationStatus
}
