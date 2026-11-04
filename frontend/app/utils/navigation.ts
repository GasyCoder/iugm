import type { NavItem } from '~/types/navigation'

/**
 * État `aria-current` d'une entrée de menu :
 * « location » pour la section de l'accueil en cours de lecture,
 * « page » pour la page ouverte (ou l'une de ses sous-pages).
 */
export function navItemCurrent(item: NavItem, currentPath: string, activeSection: string | null): 'location' | 'page' | undefined {
  if (item.sectionId) {
    return item.sectionId === activeSection ? 'location' : undefined
  }
  if (typeof item.to !== 'string') {
    return undefined
  }
  return currentPath === item.to || currentPath.startsWith(`${item.to}/`) ? 'page' : undefined
}
