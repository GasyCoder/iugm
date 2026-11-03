import type { FooterLink, FooterLinkGroup, NavItem } from '~/types/navigation'

/**
 * Tant que les pages internes ne sont pas développées, la navigation cible
 * les sections de la page d'accueil. Aucune route vers une page inexistante.
 */
function homeSection(sectionId: string) {
  return { path: '/', hash: `#${sectionId}` }
}

export const mainNavigation: NavItem[] = [
  { label: 'L’Institut', to: homeSection('institut'), sectionId: 'institut' },
  { label: 'Formations', to: homeSection('formations'), sectionId: 'formations' },
  { label: 'Admissions', to: homeSection('admissions'), sectionId: 'admissions' },
  { label: 'Vie étudiante', to: homeSection('vie-iugm'), sectionId: 'vie-iugm' },
  { label: 'Actualités', to: homeSection('actualites'), sectionId: 'actualites' },
  { label: 'Entreprises & Partenaires', to: homeSection('entreprises'), sectionId: 'entreprises' },
  { label: 'Contact', to: homeSection('contact'), sectionId: 'contact' },
]

/** Le menu mobile ajoute « Alumni » (prototype v2), dirigé vers les témoignages de diplômés. */
export const mobileNavigation: NavItem[] = [
  ...mainNavigation.slice(0, 6),
  { label: 'Alumni', to: homeSection('temoignages'), sectionId: 'temoignages' },
  ...mainNavigation.slice(6),
]

export const applyLink: NavItem = { label: 'Candidater', to: homeSection('admissions'), sectionId: 'admissions' }

export const footerNavigation: FooterLinkGroup[] = [
  {
    title: 'L’Institut',
    links: [
      { label: 'Présentation', to: homeSection('institut') },
      { label: 'Histoire' },
      { label: 'Gouvernance' },
      { label: 'Actualités', to: homeSection('actualites') },
      { label: 'Alumni', to: homeSection('temoignages') },
    ],
  },
  {
    title: 'Formations',
    links: [
      { label: 'Licence', to: homeSection('formations') },
      { label: 'Master', to: homeSection('formations') },
      { label: 'Formation à distance', to: homeSection('formations') },
      { label: 'Admissions', to: homeSection('admissions') },
      { label: 'Vie étudiante', to: homeSection('vie-iugm') },
    ],
  },
]

/** Liens institutionnels : URL et pages légales non encore fournies → affichés en texte. */
export const legalLinks: FooterLink[] = [
  { label: 'Université de Mahajanga' },
  { label: 'MESUPRES' },
  { label: 'Mentions légales' },
  { label: 'Politique de confidentialité' },
]
