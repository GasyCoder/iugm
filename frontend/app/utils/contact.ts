import type { VerificationStatus } from '~/types/content'
import type { ContactPoint, Institution, PhoneContact } from '~/types/institution'

/**
 * Règle unique : un moyen de contact n'est actionnable (tel:, mailto:) que si
 * l'IUGM l'a vérifié. Sinon il reste affiché en texte, signalé « À CONFIRMER ».
 */
export function contactHref(point: ContactPoint): string | undefined {
  if (point.status !== 'verified') {
    return undefined
  }
  return point.channel === 'phone' ? `tel:${point.target}` : `mailto:${point.target}`
}

/** Une coordonnée sans source (`pending`) n'est pas affichée : le public la prendrait pour officielle. */
export function isPublishable(point: ContactPoint): boolean {
  return point.status !== 'pending'
}

export function phoneContact(phone: PhoneContact, status: VerificationStatus): ContactPoint {
  return { channel: 'phone', display: phone.display, target: phone.e164, status }
}

export function emailContact(email: Institution['email']): ContactPoint {
  return { channel: 'email', display: email.address, target: email.address, status: email.status }
}

export function hasUnverified(points: readonly ContactPoint[]): boolean {
  return points.some(point => point.status !== 'verified')
}
