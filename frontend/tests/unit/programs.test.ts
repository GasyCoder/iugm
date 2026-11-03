import { describe, expect, it } from 'vitest'
import type { Program, ProgramFilters } from '~/types/program'
import { availableLevels, domainsForLevel, filterPrograms } from '~/utils/programs'

const fixtures: Program[] = [
  { id: 'l-fc', slug: 'l-fc', level: 'licence', domain: 'gestion', title: 'Finances et Comptabilité', admission: 'Bac A2, OSE, D, C', status: 'brochure' },
  { id: 'l-ci', slug: 'l-ci', level: 'licence', domain: 'commerce', title: 'Commerce International', admission: 'Bac toutes séries', status: 'brochure' },
  { id: 'l-eg', slug: 'l-eg', level: 'licence', domain: 'economie', title: 'Économie Générale', admission: 'Bac A2, OSE, D, C', status: 'brochure' },
  { id: 'm-fe', slug: 'm-fe', level: 'master', domain: 'finances', title: 'Finances d’Entreprise', admission: 'Mention Finances', status: 'brochure' },
  { id: 'm-mc', slug: 'm-mc', level: 'master', domain: 'marketing', title: 'Marketing et Communication', admission: 'Mention Marketing', status: 'brochure' },
  { id: 'm-bma', slug: 'm-bma', level: 'master', domain: 'economie', title: 'Banque, Microfinance et Assurance', admission: 'Mention Économie', status: 'brochure' },
  { id: 'd-fp', slug: 'd-fp', level: 'distance', domain: 'finances', title: 'Master Finances publiques', admission: 'Formation à distance', status: 'brochure' },
]

const all: ProgramFilters = { keyword: '', level: null, domain: null }

function ids(filters: Partial<ProgramFilters>): string[] {
  return filterPrograms(fixtures, { ...all, ...filters }).map(program => program.id)
}

describe('filterPrograms', () => {
  it('renvoie toutes les formations sans critère', () => {
    expect(ids({})).toHaveLength(fixtures.length)
  })

  it('filtre les formations de Licence', () => {
    expect(ids({ level: 'licence' })).toEqual(['l-fc', 'l-ci', 'l-eg'])
  })

  it('filtre les formations de Master', () => {
    expect(ids({ level: 'master' })).toEqual(['m-fe', 'm-mc', 'm-bma'])
  })

  it('filtre par domaine, tous niveaux confondus', () => {
    expect(ids({ domain: 'finances' })).toEqual(['m-fe', 'd-fp'])
  })

  it('filtre par mot-clé', () => {
    expect(ids({ keyword: 'commerce' })).toEqual(['l-ci'])
  })

  it('ignore la casse du mot-clé', () => {
    expect(ids({ keyword: 'MARKETING' })).toEqual(['m-mc'])
  })

  it('ignore les accents, dans le mot-clé comme dans les données', () => {
    expect(ids({ keyword: 'economie generale' })).toEqual(['l-eg'])
    expect(ids({ keyword: 'Économie' })).toEqual(['l-eg', 'm-bma'])
  })

  it('ignore les espaces superflus du mot-clé', () => {
    expect(ids({ keyword: '   ' })).toHaveLength(fixtures.length)
    expect(ids({ keyword: '  banque   assurance ' })).toEqual(['m-bma'])
  })

  it('combine niveau et domaine', () => {
    expect(ids({ level: 'master', domain: 'economie' })).toEqual(['m-bma'])
  })

  it('combine mot-clé, niveau et domaine', () => {
    expect(ids({ keyword: 'finances', level: 'distance', domain: 'finances' })).toEqual(['d-fp'])
    expect(ids({ keyword: 'finances', level: 'master', domain: 'finances' })).toEqual(['m-fe'])
  })

  it('renvoie une liste vide quand aucune formation ne correspond', () => {
    expect(ids({ keyword: 'médecine' })).toEqual([])
    expect(ids({ level: 'licence', domain: 'finances' })).toEqual([])
  })
})

describe('filterPrograms — abréviations', () => {
  const hr: Program[] = [
    { id: 'l-grh', slug: 'l-grh', level: 'licence', domain: 'gestion', title: 'Gestion des Ressources Humaines', admission: 'Bac toutes séries', status: 'brochure' },
    { id: 'm-rh', slug: 'm-rh', level: 'master', domain: 'management', title: 'Ressources Humaines', admission: 'Mention Management', status: 'brochure' },
    { id: 'm-mc', slug: 'm-mc', level: 'master', domain: 'marketing', title: 'Marketing et Communication', admission: 'Mention Marketing', status: 'brochure' },
  ]

  it('« RH » trouve les formations en Ressources Humaines (exemple du champ de recherche)', () => {
    expect(filterPrograms(hr, { ...all, keyword: 'RH' }).map(program => program.id)).toEqual(['l-grh', 'm-rh'])
    expect(filterPrograms(hr, { ...all, keyword: 'rh', level: 'master' }).map(program => program.id)).toEqual(['m-rh'])
  })

  it('« GRH » trouve la gestion des ressources humaines', () => {
    expect(filterPrograms(hr, { ...all, keyword: 'grh' }).map(program => program.id)).toEqual(['l-grh'])
  })
})

describe('domainsForLevel', () => {
  it('liste les domaines présents pour un niveau, sans doublon', () => {
    expect(domainsForLevel(fixtures, 'master')).toEqual(['finances', 'marketing', 'economie'])
    expect(domainsForLevel(fixtures, null)).toEqual(['gestion', 'commerce', 'economie', 'finances', 'marketing'])
  })
})

describe('availableLevels', () => {
  it('ne propose que les niveaux présents dans les données', () => {
    expect(availableLevels(fixtures.filter(program => program.level !== 'distance'))).toEqual(['licence', 'master'])
  })
})
