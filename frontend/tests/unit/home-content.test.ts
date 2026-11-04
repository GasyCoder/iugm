import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { directorMessage, keyFigures, publishedNews, publishedTestimonials } from '~/data/home'
import { contacts } from '~/data/institution'
import { heroImageWidths, heroSlides, heroThumbnailWidth } from '~/data/media'
import { programs } from '~/data/programs'
import { isPublishable } from '~/utils/contact'

describe('diaporama du Hero', () => {
  it('ne contient aucune photographie non publiable', () => {
    for (const slide of heroSlides) {
      expect(slide.image.rights).not.toBe('pending')
      expect(slide.image.assetAvailable).toBe(true)
    }
  })

  it('dispose de toutes les déclinaisons de chaque photo', () => {
    for (const slide of heroSlides) {
      for (const width of [heroThumbnailWidth, ...heroImageWidths]) {
        expect(existsSync(new URL(`../../public${slide.base}-${width}.webp`, import.meta.url)), `${slide.base}-${width}`).toBe(true)
      }
    }
  })

  it('conserve le crédit des photographies de Mim’SARY', () => {
    const credited = heroSlides.filter(slide => ['remise-diplomes.jpg', 'promotion-hery-miray.jpg'].includes(slide.image.source))
    expect(credited).toHaveLength(2)
    for (const slide of credited) {
      expect(slide.image.credit).toBe('Mim’SARY')
    }
  })
})

describe('chiffres de « L’IUGM en bref »', () => {
  it('n’affiche aucune valeur à trous', () => {
    for (const figure of keyFigures) {
      expect(figure.value).toMatch(/^\d+$/)
    }
  })

  it('correspond aux formations réellement publiées', () => {
    expect(keyFigures.find(figure => figure.label === 'formations')?.value).toBe(String(programs.length))
    const licence = programs.filter(program => program.level === 'licence').length
    expect(keyFigures.find(figure => figure.label === 'en Licence')?.value).toBe(String(licence))
  })
})

describe('contenus non validés', () => {
  it('ne publie aucun témoignage ni aucune actualité du prototype', () => {
    expect(publishedTestimonials.map(item => item.author)).not.toContain('Prénom Nom')
    for (const item of [...publishedTestimonials, ...publishedNews]) {
      expect(item.status).toBe('verified')
    }
  })

  it('n’affiche pas une adresse email sans source', () => {
    expect(contacts.email.status).toBe('pending')
    expect(isPublishable(contacts.email)).toBe(false)
  })

  it('affiche les numéros et l’email des brochures', () => {
    for (const point of [...contacts.mainPhones, ...contacts.distance]) {
      expect(isPublishable(point)).toBe(true)
    }
  })
})

describe('portrait du Directeur', () => {
  it('dispose de ses deux déclinaisons', () => {
    expect(directorMessage.photo).not.toBeNull()
    for (const width of [320, 640]) {
      expect(existsSync(new URL(`../../public${directorMessage.photo?.base}-${width}.webp`, import.meta.url))).toBe(true)
    }
  })
})

describe('mot du Directeur', () => {
  it('ne publie aucun texte tant que l’IUGM ne l’a pas transmis', () => {
    if (directorMessage.status !== 'verified') {
      expect(directorMessage.quote).toBeNull()
      expect(directorMessage.author).toBeNull()
    }
  })
})
