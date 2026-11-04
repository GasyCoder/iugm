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
  { label: 'Entreprises', to: homeSection('entreprises'), sectionId: 'entreprises' },
  { label: 'Contact', to: contactLink, sectionId: 'contact' },
]

/** « Actualités » et « Alumni » reviendront avec leurs sections, une fois de vrais contenus publiés. */
export const mobileNavigation: NavItem[] = mainNavigation

/** Aucune candidature en ligne : le lien mène aux informations d'admission, et le dit. */
export const applyLink: NavItem = { label: 'Comment candidater', to: '/admissions' }

export const footerNavigation: FooterLinkGroup[] = [
  {
    title: 'L’Institut',
    links: [
      { label: 'Présentation', to: homeSection('institut') },
      { label: 'Histoire' },
      { label: 'Gouvernance' },
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
