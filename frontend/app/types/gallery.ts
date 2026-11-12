import type { MediaImage } from './content'

export interface GalleryPhoto {
  key: string
  /** Début du chemin des fichiers publiés : `{base}-{largeur}.webp`. */
  base: string
  image: MediaImage
  /** Cadrage CSS object-position des vignettes. */
  position?: string
}

export interface GalleryAlbum {
  slug: string
  title: string
  description: string
  /** La première photo sert de couverture. */
  photos: GalleryPhoto[]
}
