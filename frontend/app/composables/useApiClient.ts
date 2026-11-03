/**
 * Client HTTP de l'API Laravel `/api/v1`.
 * Côté serveur (SSR), `apiBaseServer` permet d'utiliser une adresse réseau interne ;
 * côté navigateur, seule `public.apiBase` est exposée.
 */
export function useApiClient() {
  const config = useRuntimeConfig()
  const baseURL = import.meta.server && config.apiBaseServer ? config.apiBaseServer : config.public.apiBase

  return $fetch.create({
    baseURL,
    headers: { Accept: 'application/json' },
  })
}
