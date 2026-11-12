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
  { label: 'Actualités', to: '/actualites' },
  { label: 'Vie étudiante', to: '/galerie/vie-etudiante' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Contact', to: contactLink, sectionId: 'contact' },
]

/** « Alumni » reviendra avec sa section, une fois de vrais contenus publiés. */
export const mobileNavigation: NavItem[] = mainNavigation

/** Aucune candidature en ligne : le lien mène aux informations d'admission, et le dit. */
export const applyLink: NavItem = { label: 'Comment candidater', to: '/admissions' }

export const footerNavigation: FooterLinkGroup[] = [
  {
    title: 'L’Institut',
    links: [
      { label: 'Présentation', to: homeSection('institut') },
      { label: 'Actualités', to: '/actualites' },
      { label: 'Annonces', to: '/annonces' },
      { label: 'Galerie', to: '/galerie' },
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
      { label: 'Vie étudiante', to: '/galerie/vie-etudiante' },
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
