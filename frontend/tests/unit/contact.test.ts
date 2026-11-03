import { describe, expect, it } from 'vitest'
import { contacts } from '~/data/institution'
import { contactHref, emailContact, hasUnverified, phoneContact } from '~/utils/contact'

const phone = { display: '032 00 000 00', e164: '+261320000000' }

describe('contactHref', () => {
  it('rend actionnable un contact vérifié', () => {
    expect(contactHref(phoneContact(phone, 'verified'))).toBe('tel:+261320000000')
    expect(contactHref(emailContact({ address: 'contact@example.org', status: 'verified' }))).toBe('mailto:contact@example.org')
  })

  it('neutralise un contact non vérifié (brochure ou pending)', () => {
    expect(contactHref(phoneContact(phone, 'brochure'))).toBeUndefined()
    expect(contactHref(emailContact({ address: 'contact@example.org', status: 'pending' }))).toBeUndefined()
  })

  it('signale la présence de coordonnées non vérifiées', () => {
    expect(hasUnverified([phoneContact(phone, 'verified')])).toBe(false)
    expect(hasUnverified([phoneContact(phone, 'verified'), phoneContact(phone, 'brochure')])).toBe(true)
  })
})

describe('coordonnées institutionnelles', () => {
  it('aucune coordonnée non vérifiée n’est actionnable', () => {
    const all = [...contacts.mainPhones, contacts.email, ...contacts.regional.flatMap(campus => campus.phones)]
    for (const point of all.filter(item => item.status !== 'verified')) {
      expect(contactHref(point)).toBeUndefined()
    }
  })
})
