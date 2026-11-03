import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: RouteLocationRaw
  /** Identifiant de la section de la page d'accueil ciblée, pour l'état actif. */
  sectionId?: string
}

/** Lien de footer : sans `href`, l'entrée est affichée comme texte (page non encore publiée). */
export interface FooterLink {
  label: string
  href?: string
  to?: RouteLocationRaw
}

export interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}
