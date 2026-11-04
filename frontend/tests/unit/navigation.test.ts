import { describe, expect, it } from 'vitest'
import type { RouteLocationRaw } from 'vue-router'
import { readdirSync } from 'node:fs'
import { contacts, institution } from '~/data/institution'
import { applyLink, footerNavigation, mainNavigation, mobileNavigation } from '~/data/navigation'
import { contactHref } from '~/utils/contact'
import { navItemCurrent } from '~/utils/navigation'

function pathOf(to: RouteLocationRaw): string | undefined {
  if (typeof to === 'string') {
    return to
  }
  return 'path' in to ? to.path : undefined
}

describe('navigation', () => {
  const pageFiles = readdirSync(new URL('../../app/pages/', import.meta.url), { recursive: true }).map(String)
  const existingPaths = new Set(pageFiles.flatMap((file) => {
    if (file.includes('[') || !file.endsWith('.vue')) {
      return []
    }
    return [`/${file.replace(/\.vue$/, '').replace(/(^|\/)index$/, '')}`]
  }))

  it('ne cible que des pages existantes', () => {
    const items = [
      ...mainNavigation,
      ...mobileNavigation,
      applyLink,
      ...footerNavigation.flatMap(group => group.links),
    ]
    for (const item of items) {
      const path = item.to ? pathOf(item.to) : undefined
      if (path) {
        expect(existingPaths, `${item.label} → ${path}`).toContain(path)
      }
    }
  })

  it('ne promet pas de candidature en ligne', () => {
    expect(applyLink.label).toBe('Comment candidater')
    expect(applyLink.to).toBe('/admissions')
  })
})

describe('navItemCurrent', () => {
  const page = { label: 'Formations', to: '/formations' }
  const section = { label: 'Actualités', to: { path: '/', hash: '#actualites' }, sectionId: 'actualites' }

  it('marque la page ouverte et ses sous-pages', () => {
    expect(navItemCurrent(page, '/formations', null)).toBe('page')
    expect(navItemCurrent(page, '/formations/licence-management', null)).toBe('page')
  })

  it('ne confond pas une page au préfixe voisin', () => {
    expect(navItemCurrent(page, '/formations-continues', null)).toBeUndefined()
    expect(navItemCurrent(page, '/', null)).toBeUndefined()
  })

  it('marque la section de l’accueil en cours de lecture', () => {
    expect(navItemCurrent(section, '/', 'actualites')).toBe('location')
    expect(navItemCurrent(section, '/', 'institut')).toBeUndefined()
  })
})

describe('coordonnées de la formation à distance', () => {
  it('reprennent la brochure sans être actionnables', () => {
    expect(institution.distanceLearning.email.address).toBe('iugm.gehos2021@gmail.com')
    expect(contacts.distance).toHaveLength(3)
    for (const point of contacts.distance) {
      expect(contactHref(point)).toBeUndefined()
    }
  })
})
