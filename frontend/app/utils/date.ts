/** « 12 novembre 2026 » à partir d'une date AAAA-MM-JJ ; calculé en UTC pour que le rendu ne dépende pas du fuseau du serveur. */
export function formatLongDate(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`))
}
