import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { Announcement } from '~/types/announcement'
import { announcements } from '~/data/announcements'
import { isAnnouncementActive, publishedAnnouncements, todayInMadagascar } from '~/utils/announcements'
import { formatLongDate } from '~/utils/date'

const isoDate = /^\d{4}-\d{2}-\d{2}$/

function sample(overrides: Partial<Announcement>): Announcement {
  return { slug: 'a', category: 'Test', flash: 'Flash', title: 'Titre', summary: 'Résumé', body: [], highlights: [], publishedAt: '2026-11-12', status: 'verified', ...overrides }
}

describe('données des annonces', () => {
  it('ont des identifiants uniques et des dates AAAA-MM-JJ cohérentes', () => {
    const slugs = announcements.map(item => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const item of announcements) {
      expect(item.publishedAt, item.slug).toMatch(isoDate)
      if (item.expiresAt) {
        expect(item.expiresAt, item.slug).toMatch(isoDate)
        expect(item.expiresAt >= item.publishedAt, item.slug).toBe(true)
      }
      expect(item.flash.length, item.slug).toBeLessThanOrEqual(160)
    }
  })

  it('publient des images autorisées, présentes dans public/', () => {
    for (const item of publishedAnnouncements(announcements)) {
      if (!item.image) {
        continue
      }
      expect(item.image.rights, item.slug).not.toBe('pending')
      for (const width of item.image.widths) {
        expect(existsSync(new URL(`../../public${item.image.base}-${width}.webp`, import.meta.url)), `${item.image.base}-${width}`).toBe(true)
      }
    }
  })

  it('ne mènent qu’à des pages du site', () => {
    for (const item of announcements) {
      if (item.action) {
        expect(item.action.to.startsWith('/'), item.slug).toBe(true)
      }
    }
  })
})

describe('sélection des annonces', () => {
  it('écarte les annonces non validées et trie de la plus récente à la plus ancienne', () => {
    const list = [
      sample({ slug: 'ancienne', publishedAt: '2026-10-01' }),
      sample({ slug: 'brouillon', status: 'pending' }),
      sample({ slug: 'recente', publishedAt: '2026-11-10', status: 'brochure' }),
    ]
    expect(publishedAnnouncements(list).map(item => item.slug)).toEqual(['recente', 'ancienne'])
  })

  it('n’affiche une annonce qu’entre sa publication et son expiration incluses', () => {
    const item = sample({ publishedAt: '2026-11-12', expiresAt: '2026-11-30' })
    expect(isAnnouncementActive(item, '2026-11-11')).toBe(false)
    expect(isAnnouncementActive(item, '2026-11-12')).toBe(true)
    expect(isAnnouncementActive(item, '2026-11-30')).toBe(true)
    expect(isAnnouncementActive(item, '2026-12-01')).toBe(false)
    expect(isAnnouncementActive(sample({}), '2030-01-01')).toBe(true)
  })

  it('date le jour à l’heure de Madagascar (UTC+3)', () => {
    expect(todayInMadagascar(new Date('2026-11-12T21:30:00Z'))).toBe('2026-11-13')
    expect(todayInMadagascar(new Date('2026-11-12T20:59:00Z'))).toBe('2026-11-12')
  })

  it('formate la date en français', () => {
    expect(formatLongDate('2026-11-12')).toBe('12 novembre 2026')
  })
})
