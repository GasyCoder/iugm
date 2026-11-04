/** Ouverture du menu mobile, partagée entre le header et la barre d'onglets. */
export function useMobileMenu() {
  return useState<boolean>('mobile-menu-open', () => false)
}
