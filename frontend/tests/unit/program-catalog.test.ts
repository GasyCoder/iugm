import { describe, expect, it } from 'vitest'
import type { Program } from '~/types/program'
import { programs } from '~/data/programs'
import { documentedAdmission, filterPrograms, filtersFromQuery, filtersToQuery, relatedPrograms } from '~/utils/programs'

describe('données des formations', () => {
  it('donne à chaque formation un slug unique et utilisable dans une URL', () => {
    const slugs = programs.map(program => program.slug)
    expect(new Set(slugs).size).toBe(programs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('reprend les 24 formations des brochures', () => {
    expect(programs).toHaveLength(24)
  })

  it('ne présente pas comme Master une formation au niveau ambigu', () => {
    for (const program of programs.filter(item => item.status === 'pending')) {
      expect(program.title).not.toMatch(/master/i)
    }
  })
})

describe('documentedAdmission', () => {
  it('donne les séries de bac de toutes les Licences', () => {
    for (const program of programs.filter(item => item.level === 'licence')) {
      expect(documentedAdmission(program)).toMatch(/^Bac /)
    }
  })

  it('ne présente ni une mention ni une modalité comme une condition d’accès', () => {
    for (const program of programs.filter(item => item.level !== 'licence')) {
      expect(documentedAdmission(program)).toBeNull()
    }
  })
})

describe('relatedPrograms', () => {
  const master = programs.filter(item => item.level === 'master')
  const current = master.find(item => item.domain === 'economie') as Program

  it('reste dans la même offre, sans la formation elle-même', () => {
    const related = relatedPrograms(programs, current)
    expect(related).toHaveLength(3)
    for (const item of related) {
      expect(item.level).toBe('master')
      expect(item.id).not.toBe(current.id)
    }
  })

  it('place d’abord les formations du même domaine', () => {
    expect(relatedPrograms(programs, current)[0]?.domain).toBe('economie')
  })
})

describe('critères du catalogue dans l’URL', () => {
  it('lit le mot-clé, le niveau et le domaine', () => {
    expect(filtersFromQuery({ q: 'audit', niveau: 'master', domaine: 'finances' }))
      .toEqual({ keyword: 'audit', level: 'master', domain: 'finances' })
  })

  it('ignore les valeurs inconnues, y compris les propriétés héritées', () => {
    expect(filtersFromQuery({ niveau: 'doctorat', domaine: 'constructor' }))
      .toEqual({ keyword: '', level: null, domain: null })
  })

  it('accepte un paramètre répété sans planter', () => {
    expect(filtersFromQuery({ q: ['rh', 'audit'], niveau: [null] }))
      .toEqual({ keyword: 'rh', level: null, domain: null })
  })

  it('n’écrit que les critères actifs', () => {
    expect(filtersToQuery({ keyword: '   ', level: null, domain: null })).toEqual({})
    expect(filtersToQuery({ keyword: 'rh', level: 'licence', domain: null })).toEqual({ q: 'rh', niveau: 'licence' })
  })

  it('retrouve les mêmes formations après un aller-retour par l’URL', () => {
    const filters = { keyword: 'finances', level: 'master', domain: 'finances' } as const
    const restored = filtersFromQuery(filtersToQuery(filters))
    expect(filterPrograms(programs, restored)).toEqual(filterPrograms(programs, filters))
    expect(filterPrograms(programs, restored).length).toBeGreaterThan(0)
  })
})
