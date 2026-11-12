import type { Announcement } from '../types/announcement'

/**
 * Annonces et Flash info.
 *
 * Ajouter une annonce : une entrée ici (la plus récente en tête n'est pas obligatoire, le tri se fait par date),
 * les images éventuelles dans public/images/annonces, puis régénérer et publier le site.
 * Le site étant pré-rendu, une annonce n'apparaît ou ne disparaît (expiresAt) qu'à la régénération suivante.
 *
 * Textes repris de l'affiche officielle de l'IUGM, transmise par le responsable du projet le 12 novembre 2026.
 */
export const announcements: Announcement[] = [
  {
    slug: 'management-de-la-sante-directement-en-l2',
    category: 'Inscriptions',
    flash: 'Parcours Management de la santé : commencez directement en L2. PACES ou parcours équivalents, inscrivez-vous dès maintenant !',
    title: 'Parcours Management de la santé : commencez directement en L2',
    summary: 'Le parcours Management de la santé s’adresse aux étudiants issus de la PACES ou d’un parcours équivalent, qui commencent directement en deuxième année de Licence (L2).',
    body: [
      'Construisez votre avenir avec une formation de qualité et habilitée par le MESUPRES.',
      'Choisissez un parcours d’avenir dans le domaine du management de la santé : inscrivez-vous dès maintenant !',
    ],
    highlights: [
      'Une formation tournée vers les besoins du secteur de la santé',
      'Des débouchés prometteurs dans les hôpitaux, les ONG et les projets de management de la santé',
      'Des compétences en gestion, planification et leadership',
      'Contribuer à l’amélioration du système de management de la santé',
    ],
    publishedAt: '2026-11-12',
    image: {
      base: '/images/annonces/management-sante-l2',
      widths: [480, 960],
      alt: 'Affiche de l’IUGM : parcours Management de la santé, commencez directement en L2, cibles PACES ou parcours équivalents, inscrivez-vous dès maintenant',
      width: 1024,
      height: 1536,
      rights: 'project-approved',
    },
    action: { label: 'Comment candidater', to: '/admissions' },
    status: 'brochure',
  },
]
