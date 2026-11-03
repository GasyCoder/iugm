import type { MediaImage } from '~/types/content'

/**
 * Photographies du prototype (design/assets). Droits de publication non confirmés :
 * deux fichiers portent le copyright EXIF « Mim'SARY » (fichiers sources inchangés).
 * Les originaux restent uniquement dans les ressources locales de conception.
 * `source` conserve leur nom ; aucune URL publique n'est fournie et l'UI utilise des placeholders.
 *
 * PUBLICATION PRODUCTION INTERDITE tant que les droits ne sont pas confirmés
 * (rights: 'pending'). Ne pas passer à 'cleared' sans accord écrit des ayants droit.
 */
export const media = {
  graduation: {
    source: 'remise-diplomes.jpg',
    assetAvailable: false,
    alt: 'Remise des diplômes de l’IUGM : les diplômés en toge bleue applaudissent',
    width: 2018,
    height: 1346,
    credit: 'Mim’SARY',
    rights: 'pending',
  },
  promotion: {
    source: 'promotion-hery-miray.jpg',
    assetAvailable: false,
    alt: 'Diplômés de la promotion Hery Miray avec un enseignant en toge devant le logo de l’IUGM',
    width: 1965,
    height: 1310,
    credit: 'Mim’SARY',
    rights: 'pending',
  },
  fairStand: {
    source: 'stand-salon.jpg',
    assetAvailable: false,
    alt: 'L’équipe de l’IUGM sur son stand avec des représentants de l’Université de Mahajanga',
    width: 1553,
    height: 1134,
    rights: 'pending',
  },
  teamStand: {
    source: 'stand-equipe.jpg',
    assetAvailable: false,
    alt: 'Équipe IUGM accueillant les visiteurs sur le stand de l’Institut',
    width: 2016,
    height: 1134,
    rights: 'pending',
  },
} satisfies Record<string, MediaImage>

export const logo = {
  src: '/images/logo-iugm.png',
  width: 480,
  height: 480,
}
