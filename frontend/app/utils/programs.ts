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

/**
 * Condition d'accès indiquée par une brochure, ou `null` si elle n'en donne aucune.
 * Seule la brochure Licence précise des séries de bac : pour les autres offres,
 * `admission` porte une mention ou une modalité, à ne pas présenter comme une condition.
 */
export function documentedAdmission(program: Program): string | null {
  return program.level === 'licence' ? program.admission : null
}

/** Autres formations de la même offre, celles du même domaine en premier. */
export function relatedPrograms(programs: readonly Program[], program: Program, limit = 3): Program[] {
  const others = programs.filter(other => other.level === program.level && other.id !== program.id)
  return [
    ...others.filter(other => other.domain === program.domain),
    ...others.filter(other => other.domain !== program.domain),
  ].slice(0, limit)
}

function firstQueryValue(value: unknown): string {
  const first = Array.isArray(value) ? value[0] : value
  return typeof first === 'string' ? first : ''
}

/** Critères du catalogue depuis l'URL ; toute valeur inconnue est ignorée. */
export function filtersFromQuery(query: Record<string, unknown>): ProgramFilters {
  const level = firstQueryValue(query.niveau)
  const domain = firstQueryValue(query.domaine)
  return {
    keyword: firstQueryValue(query.q),
    level: Object.hasOwn(programLevelLabels, level) ? level as ProgramLevel : null,
    domain: Object.hasOwn(programDomainLabels, domain) ? domain as ProgramDomain : null,
  }
}

/** URL du catalogue pour ces critères : seuls les critères actifs y figurent. */
export function filtersToQuery(filters: Readonly<ProgramFilters>): Record<string, string> {
  return {
    ...(filters.keyword.trim() ? { q: filters.keyword } : {}),
    ...(filters.level ? { niveau: filters.level } : {}),
    ...(filters.domain ? { domaine: filters.domain } : {}),
  }
}
