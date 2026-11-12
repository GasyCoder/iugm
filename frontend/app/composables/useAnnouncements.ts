import { announcements } from '~/data/announcements'

/**
 * Annonces publiées et annonces en cours.
 * La date de référence est celle du rendu, transmise au client par le payload :
 * le navigateur affiche exactement ce qui a été pré-rendu, sans écart à l'hydratation.
 */
export function useAnnouncements() {
  const today = useState('announcements-today', () => todayInMadagascar())
  const published = publishedAnnouncements(announcements)
  const active = computed(() => published.filter(item => isAnnouncementActive(item, today.value)))
  return { published, active }
}
