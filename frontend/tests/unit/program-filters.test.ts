import type { Ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readonly, ref } from 'vue'
import { useProgramFilters } from '~/composables/useProgramFilters'

// useState (Nuxt) remplacé par un registre clé → ref : même sémantique d'état partagé par clé.
let states: Map<string, Ref<unknown>>

beforeEach(() => {
  states = new Map()
  vi.stubGlobal('readonly', readonly)
  vi.stubGlobal('useState', <T>(key: string, init: () => T): Ref<T> => {
    if (!states.has(key)) {
      states.set(key, ref(init()) as Ref<unknown>)
    }
    return states.get(key) as Ref<T>
  })
})

describe('useProgramFilters', () => {
  it('démarre sur Licence, sans domaine ni mot-clé (prototype v2)', () => {
    const { filters } = useProgramFilters()
    expect(filters.value).toEqual({ keyword: '', level: 'licence', domain: null })
  })

  it('changer de niveau réinitialise le domaine et conserve le mot-clé', () => {
    const { filters, setKeyword, setDomain, setLevel } = useProgramFilters()
    setKeyword('finances')
    setDomain('finances')
    setLevel('master')
    expect(filters.value).toEqual({ keyword: 'finances', level: 'master', domain: null })
    setLevel(null)
    expect(filters.value.level).toBeNull()
  })

  it('la recherche rapide porte sur tous les niveaux et domaines', () => {
    const { filters, setDomain, searchEverywhere } = useProgramFilters()
    setDomain('gestion')
    searchEverywhere('mba')
    expect(filters.value).toEqual({ keyword: 'mba', level: null, domain: null })
  })

  it('reset restaure les critères par défaut', () => {
    const { filters, setLevel, setKeyword, reset } = useProgramFilters()
    setLevel('distance')
    setKeyword('management')
    reset()
    expect(filters.value).toEqual({ keyword: '', level: 'licence', domain: null })
  })

  it('partage le même état entre la recherche et l’explorateur', () => {
    const search = useProgramFilters()
    const explorer = useProgramFilters()
    search.setLevel('master')
    search.setKeyword('audit')
    expect(explorer.filters.value).toEqual({ keyword: 'audit', level: 'master', domain: null })
    explorer.setDomain('finances')
    expect(search.filters.value.domain).toBe('finances')
  })
})
