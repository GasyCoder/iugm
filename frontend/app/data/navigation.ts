import type { FooterLink, FooterLinkGroup, NavItem } from '~/types/navigation'

/** Section de la page d'accueil, pour les rubriques sans page dédiée. */
function homeSection(sectionId: string) {
  return { path: '/', hash: `#${sectionId}` }
}

function programsAtLevel(niveau: string) {
  return { path: '/formations', query: { niveau } }
}

/** Le footer est présent sur toutes les pages : le lien reste sur la page en cours. */
const contactLink = { hash: '#contact' }

export const mainNavigation: NavItem[] = [
  { label: 'L’Institut', to: homeSection('institut'), sectionId: 'institut' },
  { label: 'Formations', to: '/formations' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Vie étudiante', to: homeSection('vie-iugm'), sectionId: 'vie-iugm' },
  { label: 'Actualités', to: homeSection('actualites'), sectionId: 'actualites' },
  { label: 'Entreprises & Partenaires', to: homeSection('entreprises'), sectionId: 'entreprises' },
  { label: 'Contact', to: contactLink, sectionId: 'contact' },
]

/** Le menu mobile ajoute « Alumni » (prototype v2), dirigé vers les témoignages de diplômés. */
export const mobileNavigation: NavItem[] = [
  ...mainNavigation.slice(0, 6),
  { label: 'Alumni', to: homeSection('temoignages'), sectionId: 'temoignages' },
  ...mainNavigation.slice(6),
]

/** Aucune candidature en ligne : le lien mène aux informations d'admission, et le dit. */
export const applyLink: NavItem = { label: 'Comment candidater', to: '/admissions' }

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
      { label: 'Licence', to: programsAtLevel('licence') },
      { label: 'Master', to: programsAtLevel('master') },
      { label: 'Formation à distance', to: programsAtLevel('distance') },
      { label: 'Admissions', to: '/admissions' },
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
