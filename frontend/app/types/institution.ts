import type { VerificationStatus } from './content'

export interface PhoneContact {
  /** Affichage local, ex. « 032 41 048 32 ». */
  display: string
  /** Format E.164 pour les liens tel:. */
  e164: string
}

export type ContactChannel = 'phone' | 'email'

/** Moyen de contact affichable ; l'action (tel:, mailto:) n'existe que pour une donnée vérifiée. */
export interface ContactPoint {
  channel: ContactChannel
  display: string
  /** Numéro E.164 ou adresse email. */
  target: string
  status: VerificationStatus
}

export interface Campus {
  name: string
  phones: PhoneContact[]
  status: VerificationStatus
}

export interface Institution {
  acronym: string
  name: string
  parent: string
  motto: string
  values: string
  address: string[]
  status: VerificationStatus
  mainCampus: Campus
  regionalCampuses: Campus[]
  email: {
    address: string
    status: VerificationStatus
  }
  facebook: {
    label: string
    /** URL officielle non fournie : le lien ne sera affiché qu'une fois confirmé. */
    url?: string
  }
}
