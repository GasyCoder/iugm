import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { galleryAlbums, galleryImageWidths } from '~/data/gallery'
import { gallerySrcset, photoCountLabel } from '~/utils/gallery'

const photos = galleryAlbums.flatMap(album => album.photos)

describe('galerie', () => {
  it('a des albums et des photos aux identifiants uniques', () => {
    const slugs = galleryAlbums.map(album => album.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const album of galleryAlbums) {
      expect(album.photos.length, album.slug).toBeGreaterThan(0)
      const keys = album.photos.map(photo => photo.key)
      expect(new Set(keys).size, album.slug).toBe(keys.length)
    }
  })

  it('ne publie que des photos autorisées, décrites par un texte alternatif', () => {
    for (const photo of photos) {
      expect(photo.image.rights, photo.key).not.toBe('pending')
      expect(photo.image.alt.length, photo.key).toBeGreaterThan(10)
    }
  })

  it('fournit chaque déclinaison WebP dans public/', () => {
    for (const photo of photos) {
      for (const width of galleryImageWidths) {
        const file = new URL(`../../public${photo.base}-${width}.webp`, import.meta.url)
        expect(existsSync(file), `${photo.base}-${width}.webp`).toBe(true)
      }
    }
  })

  it('n’annonce pas une largeur supérieure à l’original', () => {
    const narrow = photos.find(photo => photo.image.width < 1600)
    expect(narrow).toBeDefined()
    expect(gallerySrcset(narrow!)).toContain(`-1600.webp ${narrow!.image.width}w`)
  })

  it('accorde le nombre de photos', () => {
    expect(photoCountLabel(1)).toBe('1 photo')
    expect(photoCountLabel(3)).toBe('3 photos')
  })
})
