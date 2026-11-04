import type { ProgramDomain, ProgramFilters, ProgramLevel } from '~/types/program'

/**
 * Critères du catalogue /formations, reflétés dans l'URL (partage, retour arrière).
 * La page est pré-rendue sans critère : l'URL n'est lue qu'après l'hydratation,
 * pour que le premier rendu client corresponde au HTML statique.
 */
export function useCatalogFilters() {
  const route = useRoute()
  const router = useRouter()
  const filters = ref<ProgramFilters>({ keyword: '', level: null, domain: null })

  function syncFromRoute() {
    const next = filtersFromQuery(route.query)
    if (JSON.stringify(filtersToQuery(next)) !== JSON.stringify(filtersToQuery(filters.value))) {
      filters.value = next
    }
  }

  function update(changes: Partial<ProgramFilters>) {
    filters.value = { ...filters.value, ...changes }
    router.replace({ query: filtersToQuery(filters.value), hash: route.hash })
  }

  onMounted(syncFromRoute)
  watch(() => route.query, syncFromRoute)

  return {
    filters: readonly(filters),
    setKeyword: (keyword: string) => update({ keyword }),
    /** Changer de niveau réinitialise le domaine, comme sur l'accueil. */
    setLevel: (level: ProgramLevel | null) => update({ level, domain: null }),
    setDomain: (domain: ProgramDomain | null) => update({ domain }),
    reset: () => update({ keyword: '', level: null, domain: null }),
  }
}
