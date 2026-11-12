import type { GalleryPhoto } from '~/types/gallery'
import { galleryImageWidths } from '~/data/gallery'

/** srcset des fichiers `{base}-{largeur}.webp` ; une photo plus étroite qu'une largeur n'est pas agrandie. */
export function gallerySrcset(photo: GalleryPhoto): string {
  return galleryImageWidths
    .map(width => `${photo.base}-${width}.webp ${Math.min(width, photo.image.width)}w`)
    .join(', ')
}

export function gallerySrc(photo: GalleryPhoto, width = galleryImageWidths[0]): string {
  return `${photo.base}-${width}.webp`
}

export function photoCountLabel(count: number): string {
  return `${count} photo${count > 1 ? 's' : ''}`
}
