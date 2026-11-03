import type { Institution } from '~/types/institution'
import { emailContact, phoneContact } from '~/utils/contact'

/**
 * Coordonnées reprises des brochures IUGM (design/uploads) et du prototype v2.
 * L'adresse email n'apparaît dans aucune brochure : statut « pending ».
 * Aucun moyen de contact n'est « verified » : pas de lien tel:/mailto: tant que l'IUGM ne les a pas validés.
 */
export const institution: Institution = {
  acronym: 'IUGM',
  name: 'Institut Universitaire de Gestion et de Management',
  parent: 'Université de Mahajanga',
  motto: 'Faire plus, avec peu.',
  values: 'Innover · Construire · Rayonner',
  address: ['Institut Universitaire de Gestion et de Management', 'Immeuble Kakal, Mahajanga Be 401', 'Mahajanga — Madagascar'],
  status: 'brochure',
  mainCampus: {
    name: 'Mahajanga',
    phones: [
      { display: '032 41 048 32', e164: '+261324104832' },
      { display: '038 42 619 59', e164: '+261384261959' },
    ],
    status: 'brochure',
  },
  regionalCampuses: [
    { name: 'Antsohihy', phones: [{ display: '032 93 309 08', e164: '+261329330908' }], status: 'brochure' },
    { name: 'Maevatanana', phones: [{ display: '034 07 579 44', e164: '+261340757944' }], status: 'brochure' },
  ],
  email: {
    address: 'communication2022.iugm@gmail.com',
    status: 'pending',
  },
  facebook: {
    label: 'IUGM Majunga',
  },
}

/** Moyens de contact dérivés, avec leur statut (actionnables seulement si vérifiés). */
export const contacts = {
  mainPhones: institution.mainCampus.phones.map(phone => phoneContact(phone, institution.mainCampus.status)),
  email: emailContact(institution.email),
  regional: institution.regionalCampuses.map(campus => ({
    name: campus.name,
    phones: campus.phones.map(phone => phoneContact(phone, campus.status)),
  })),
}
