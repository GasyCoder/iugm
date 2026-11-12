import type { Announcement, AnnouncementImage } from '~/types/announcement'

/** Annonces publiables (statut vérifié ou repris d'un support IUGM), de la plus récente à la plus ancienne. */
export function publishedAnnouncements(list: Announcement[]): Announcement[] {
  return list
    .filter(item => item.status !== 'pending')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** En cours d'affichage le jour `today` (AAAA-MM-JJ), bornes incluses. */
export function isAnnouncementActive(item: Announcement, today: string): boolean {
  return item.publishedAt <= today && (!item.expiresAt || today <= item.expiresAt)
}

/** Date du jour à Madagascar, au format AAAA-MM-JJ. */
export function todayInMadagascar(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Indian/Antananarivo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

export function announcementSrcset(image: AnnouncementImage): string {
  return image.widths.map(width => `${image.base}-${width}.webp ${Math.min(width, image.width)}w`).join(', ')
}

export function announcementSrc(image: AnnouncementImage, width = image.widths[0]): string {
  return `${image.base}-${width}.webp`
}
