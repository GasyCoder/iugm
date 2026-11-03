/**
 * Statut de vérification d'une donnée institutionnelle.
 * - verified : validée par l'IUGM ;
 * - brochure : reprise d'un support IUGM (brochure), à confirmer pour le site ;
 * - pending  : non sourcée, affichée « À CONFIRMER PAR L'IUGM ».
 */
export type VerificationStatus = 'verified' | 'brochure' | 'pending'

export type MediaRightsStatus = 'cleared' | 'pending'

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
