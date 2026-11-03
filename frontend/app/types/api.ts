/** Enveloppes JSON de l'API Laravel `/api/v1` (voir docs/API_CONTRACT.md). */

export interface ApiResource<T> {
  data: T
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export interface ApiCollection<T> {
  data: T[]
  meta: PaginationMeta
}
