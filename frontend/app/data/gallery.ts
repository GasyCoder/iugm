import type { MediaImage } from '../types/content'
import type { GalleryAlbum, GalleryPhoto } from '../types/gallery'

/**
 * Albums photo de l'IUGM. Fichiers publiés : public/images/galerie/{album}/{photo}-{largeur}.webp.
 *
 * Publication demandée par le responsable du projet le 12 novembre 2026 (`project-approved`),
 * comme les photos du Hero : l'accord écrit des personnes photographiées reste à joindre.
 * Titres et légendes décrivent ce que montrent les photos : ni date, ni lieu, ni nom d'événement non communiqués.
 */

/** Largeurs des fichiers `{base}-{largeur}.webp` : vignettes, puis visionneuse. */
export const galleryImageWidths = [480, 960, 1600]

function photo(album: string, key: string, image: Omit<MediaImage, 'source' | 'assetAvailable' | 'rights'>, position?: string): GalleryPhoto {
  return {
    key,
    base: `/images/galerie/${album}/${key}`,
    image: { ...image, source: `${key}.png`, assetAvailable: true, rights: 'project-approved' },
    position,
  }
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    // Photos du communiqué du 29 octobre 2026 (voir data/articles.ts). Les personnes ne sont pas nommées : qui figure sur quelle photo n'est pas précisé.
    slug: 'erasmus-hei-blue',
    title: 'Erasmus+ HEI-Blue',
    description: 'Visites de courtoisie avant la conférence finale du projet, à l’île Maurice.',
    photos: [
      photo('erasmus-hei-blue', 'visite-1-debout', { alt: 'L’étudiante et un participant en polo HEI-Blue, debout aux côtés de leur hôte lors d’une visite de courtoisie', width: 1333, height: 1600 }, '50% 30%'),
      photo('erasmus-hei-blue', 'visite-2-entretien', { alt: 'Échange entre l’hôte et deux participants en polo HEI-Blue, assis dans un bureau', width: 1280, height: 960 }),
      photo('erasmus-hei-blue', 'visite-2-debout', { alt: 'L’étudiante, en polo HEI-Blue, entre son hôte et un autre participant du projet', width: 1280, height: 960 }, '50% 35%'),
      photo('erasmus-hei-blue', 'visite-1-assis', { alt: 'L’étudiante et deux participants assis autour d’une table basse lors d’une visite de courtoisie', width: 1333, height: 1600 }, '50% 40%'),
    ],
  },
  {
    slug: 'stand-iugm',
    title: 'Le stand de l’IUGM',
    description: 'L’équipe de l’Institut présente ses formations aux visiteurs.',
    photos: [
      photo('stand-iugm', 'accueil-visiteur', { alt: 'Un membre de l’équipe IUGM renseigne un visiteur sur le stand de l’Institut', width: 2000, height: 1500 }),
      photo('stand-iugm', 'presentation-formations', { alt: 'Un membre de l’équipe IUGM présente les formations à des visiteurs autour de la table du stand', width: 2000, height: 1500 }),
      photo('stand-iugm', 'equipe-stand', { alt: 'Deux membres de l’équipe IUGM souriants derrière la table du stand', width: 1500, height: 1125 }),
      photo('stand-iugm', 'stand-licence-master', { alt: 'Équipe et visiteurs sur le stand de l’IUGM, devant les kakémonos Licence et Master', width: 2000, height: 1500 }),
      photo('stand-iugm', 'equipe-invites', { alt: 'Membres de l’IUGM et invités devant les stands de l’Université de Mahajanga', width: 2016, height: 1134 }),
    ],
  },
  {
    slug: 'ceremonies',
    title: 'Cérémonies officielles',
    description: 'Sur l’estrade de l’IUGM et à la Maison de la Culture de Mahajanga.',
    photos: [
      photo('ceremonies', 'estrade-iugm', { alt: 'Officiels et invités assis sur l’estrade de l’IUGM pendant une prise de parole', width: 1500, height: 1125 }),
      photo('ceremonies', 'tribune-maison-culture', { alt: 'Public assis face à la tribune lors d’une cérémonie à la Maison de la Culture de Mahajanga', width: 2000, height: 1500 }),
      photo('ceremonies', 'groupe-maison-culture', { alt: 'Officiels et participants posant devant la Maison de la Culture de Mahajanga', width: 2000, height: 1500 }),
    ],
  },
  {
    slug: 'culture-artisanat',
    title: 'Culture et artisanat',
    description: 'Tenues traditionnelles et créations artisanales des étudiants.',
    photos: [
      photo('culture-artisanat', 'grand-groupe', { alt: 'Grand groupe d’étudiants en tenues traditionnelles devant les lettres IUGM, présentant vêtements et produits artisanaux', width: 2048, height: 1536 }, '50% 60%'),
      photo('culture-artisanat', 'vannerie', { alt: 'Étudiants posant devant les lettres IUGM avec des objets en vannerie', width: 1280, height: 946 }),
      photo('culture-artisanat', 'tenues-traditionnelles', { alt: 'Étudiants en tenues traditionnelles lors d’une présentation en salle de classe', width: 2048, height: 1536 }),
    ],
  },
  {
    slug: 'vie-etudiante',
    title: 'Vie étudiante',
    description: 'En amphithéâtre et sur le terrain.',
    photos: [
      photo('vie-etudiante', 'amphitheatre', { alt: 'Membres de l’IUGM en polo blanc réunis avec les étudiants dans un amphithéâtre', width: 2016, height: 1134 }),
      photo('vie-etudiante', 'basket', { alt: 'Une équipe de basket féminine et ses encadrants sur un terrain de plein air', width: 2000, height: 1500 }),
    ],
  },
]

export function findAlbum(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find(album => album.slug === slug)
}
