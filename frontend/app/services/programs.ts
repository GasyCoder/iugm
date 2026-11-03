import type { Program } from '~/types/program'
import { programs } from '~/data/programs'

/**
 * Source unique des formations pour l'interface.
 * Données locales pour le prototype ; lors du branchement Laravel :
 *   const api = useApiClient()
 *   const { data } = await api<ApiCollection<Program>>('/programs')
 *   return data
 */
export async function fetchPrograms(): Promise<Program[]> {
  return programs
}
