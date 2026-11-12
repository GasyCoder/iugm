import { describe, expect, it } from 'vitest'
import type { Article } from '~/types/article'
import { articles } from '~/data/articles'
import { findAlbum } from '~/data/gallery'
import { articlePhotos, publishedArticles } from '~/utils/articles'

function sample(overrides: Partial<Article>): Article {
  return { slug: 'a', category: 'Test', title: 'Titre', subtitle: 'Sous-titre', date: '2026-11-12', place: 'Mahajanga', lead: 'Chapeau', sections: [], status: 'verified', ...overrides }
}

describe('actualités', () => {
  it('ont des identifiants uniques, des dates AAAA-MM-JJ et un album existant', () => {
    const slugs = articles.map(item => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const item of articles) {
      expect(item.date, item.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      if (item.albumSlug) {
        expect(findAlbum(item.albumSlug), item.slug).toBeDefined()
        expect(articlePhotos(item).length, item.slug).toBeGreaterThan(0)
      }
    }
  })

  it('ne publient que les actualités vérifiées, de la plus récente à la plus ancienne', () => {
    const list = [
      sample({ slug: 'ancienne', date: '2026-01-10' }),
      sample({ slug: 'brouillon', status: 'pending' }),
      sample({ slug: 'brochure', status: 'brochure' }),
      sample({ slug: 'recente', date: '2026-10-29' }),
    ]
    expect(publishedArticles(list).map(item => item.slug)).toEqual(['recente', 'ancienne'])
  })

  it('n’ont pas de photos sans album', () => {
    expect(articlePhotos(sample({}))).toEqual([])
  })
})
