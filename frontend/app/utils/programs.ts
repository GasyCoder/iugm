import type { Program, ProgramDomain, ProgramFilters, ProgramLevel } from '~/types/program'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
}

/** Abréviations usuelles → expression présente dans les intitulés (normalisée). */
const keywordAliases: Record<string, string> = {
  rh: 'ressources humaines',
  grh: 'gestion des ressources humaines',
}

function matchesKeyword(program: Program, keyword: string): boolean {
  const terms = normalize(keyword).split(/\s+/).filter(Boolean)
  if (terms.length === 0) {
    return true
  }
  const haystack = normalize([
    program.title,
    programDomainLabels[program.domain],
    programLevelLabels[program.level],
    program.admission,
  ].join(' '))
  return terms.every((term) => {
    const alias = keywordAliases[term]
    return haystack.includes(term) || (alias !== undefined && haystack.includes(alias))
  })
}

/**
 * Filtre les formations : niveau et domaine exacts (`null` = tous),
 * mot-clé insensible à la casse et aux accents, chaque mot devant être présent
 * (directement ou via une abréviation connue, ex. « RH »).
 */
export function filterPrograms(programs: readonly Program[], filters: Readonly<ProgramFilters>): Program[] {
  return programs.filter(program =>
    (filters.level === null || program.level === filters.level)
    && (filters.domain === null || program.domain === filters.domain)
    && matchesKeyword(program, filters.keyword),
  )
}

/** Domaines présents pour un niveau, dans l'ordre d'apparition (puces de filtre). */
export function domainsForLevel(programs: readonly Program[], level: ProgramLevel | null): ProgramDomain[] {
  const domains = programs
    .filter(program => level === null || program.level === level)
    .map(program => program.domain)
  return [...new Set(domains)]
}

/** Niveaux réellement présents dans les données, dans l'ordre de référence. */
export function availableLevels(programs: readonly Program[]): ProgramLevel[] {
  const present = new Set(programs.map(program => program.level))
  return (Object.keys(programLevelLabels) as ProgramLevel[]).filter(level => present.has(level))
}
