import { fetchPrograms } from '~/services/programs'

export function usePrograms() {
  return useAsyncData('programs', fetchPrograms, { default: () => [] })
}
