import type { HeroSlide, MediaImage } from '~/types/content'

/**
 * Photographies de l'IUGM. Originaux : design/assets (hors dépôt) ; déclinaisons publiées : public/images/hero.
 *
 * Publication dans le Hero demandée par le responsable du projet le 4 novembre 2026 (`project-approved`).
 * Cela ne vaut pas accord écrit : à joindre pour les personnes photographiées et pour Mim'SARY,
 * titulaire du copyright EXIF de deux fichiers. Le crédit reste affiché et conservé dans les métadonnées.
 * Ne passer à `cleared` qu'une fois ces accords obtenus.
 */
export const media = {
  graduation: {
    source: 'remise-diplomes.jpg',
    assetAvailable: true,
    alt: 'Remise des diplômes de l’IUGM : les diplômés en toge bleue applaudissent',
    width: 2018,
    height: 1346,
    credit: 'Mim’SARY',
    rights: 'project-approved',
  },
  promotion: {
    source: 'promotion-hery-miray.jpg',
    assetAvailable: true,
    alt: 'Diplômés de la promotion Hery Miray avec un enseignant en toge devant le logo de l’IUGM',
    width: 1965,
    height: 1310,
    credit: 'Mim’SARY',
    rights: 'project-approved',
  },
  fairStand: {
    source: 'stand-salon.jpg',
    assetAvailable: true,
    alt: 'L’équipe de l’IUGM sur son stand avec des représentants de l’Université de Mahajanga',
    width: 1553,
    height: 1134,
    rights: 'project-approved',
  },
  teamStand: {
    source: 'stand-equipe.jpg',
    assetAvailable: true,
    alt: 'Équipe IUGM accueillant les visiteurs sur le stand de l’Institut',
    width: 2016,
    height: 1134,
    rights: 'project-approved',
  },
} satisfies Record<string, MediaImage>

/** Largeurs des fichiers `{base}-{largeur}.webp`. */
export const heroImageWidths = [480, 800, 1280]
export const heroThumbnailWidth = 160

/** Légendes limitées à ce que montrent les photos : ni date ni lieu, non communiqués. */
export const heroSlides: HeroSlide[] = [
  {
    key: 'remise-diplomes',
    base: '/images/hero/remise-diplomes',
    image: media.graduation,
    title: 'Remise des diplômes',
    subtitle: 'Promotions Mahiratra, Hery Miray et Santatra',
    position: '50% 80%',
  },
  {
    key: 'promotion-hery-miray',
    base: '/images/hero/promotion-hery-miray',
    image: media.promotion,
    title: 'Les diplômés de l’IUGM',
    subtitle: 'Promotions Hery Miray et Mahiratra',
    position: '50% 55%',
  },
  {
    key: 'stand-equipe',
    base: '/images/hero/stand-equipe',
    image: media.teamStand,
    title: 'Le stand de l’IUGM',
    subtitle: 'Gestion · Commerce · Économie',
    position: '55% 60%',
  },
  {
    key: 'stand-salon',
    base: '/images/hero/stand-salon',
    image: media.fairStand,
    title: 'L’équipe de l’IUGM',
    subtitle: 'Avec des représentants de l’Université de Mahajanga',
    position: '50% 35%',
  },
]

export const logo = {
  src: '/images/logo-iugm.webp',
  /** Aperçus sociaux (og:image) : PNG universellement accepté. */
  fallbackSrc: '/images/logo-iugm.png',
  width: 480,
  height: 480,
}
