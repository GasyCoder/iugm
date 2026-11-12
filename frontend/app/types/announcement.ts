import type { MediaRightsStatus, VerificationStatus } from './content'

export interface AnnouncementImage {
  /** Début du chemin des fichiers publiés : `{base}-{largeur}.webp`. */
  base: string
  widths: number[]
  alt: string
  width: number
  height: number
  rights: MediaRightsStatus
}

export interface Announcement {
  slug: string
  /** Rubrique affichée en badge : Inscriptions, Événement… */
  category: string
  /** Phrase courte du bandeau Flash info. */
  flash: string
  title: string
  summary: string
  /** Paragraphes de l'annonce. */
  body: string[]
  /** Points clés, affichés en liste. */
  highlights: string[]
  /** Date de mise en ligne, AAAA-MM-JJ. */
  publishedAt: string
  /** Dernier jour dans le bandeau et sur l'accueil, AAAA-MM-JJ ; l'annonce reste ensuite consultable sur /annonces. */
  expiresAt?: string
  image?: AnnouncementImage
  /** Lien d'action interne au site. */
  action?: { label: string, to: string }
  /** `pending` : jamais publiée. */
  status: VerificationStatus
}
