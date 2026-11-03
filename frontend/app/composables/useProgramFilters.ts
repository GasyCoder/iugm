import type { ProgramDomain, ProgramFilters, ProgramLevel } from '~/types/program'

/** Licence par défaut, comme le prototype v2 (« Tous » reste disponible). */
function defaultFilters(): ProgramFilters {
  return { keyword: '', level: 'licence', domain: null }
}

/**
 * État partagé des critères de recherche de formations : une seule source,
 * écrite par la recherche (HomeProgramSearch, menu mobile) et par l'explorateur
 * (HomePrograms), lue par les deux. Le mot-clé est conservé tel que saisi ;
 * la normalisation (espaces, casse, accents) est faite au filtrage.
 */
export function useProgramFilters() {
  const filters = useState<ProgramFilters>('program-filters', defaultFilters)

  /** Changer de niveau réinitialise le domaine (comportement du prototype v2). */
  function setLevel(level: ProgramLevel | null) {
    filters.value = { ...filters.value, level, domain: null }
  }

  function setDomain(domain: ProgramDomain | null) {
    filters.value = { ...filters.value, domain }
  }

  function setKeyword(keyword: string) {
    filters.value = { ...filters.value, keyword }
  }

  /** Recherche par mot-clé sur l'ensemble de l'offre (tous niveaux, tous domaines). */
  function searchEverywhere(keyword: string) {
    filters.value = { keyword, level: null, domain: null }
  }

  function reset() {
    filters.value = defaultFilters()
  }

  return {
    filters: readonly(filters),
    setLevel,
    setDomain,
    setKeyword,
    searchEverywhere,
    reset,
  }
}
