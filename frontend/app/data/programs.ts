import type { Program, ProgramDomain, ProgramLevel } from '../types/program'

/**
 * Offre de formation reprise des brochures IUGM (design/uploads, 3 brochures)
 * et du prototype Accueil v2. À confirmer par l'IUGM avant publication.
 * Données locales temporaires : remplacées ensuite par GET /api/v1/programs.
 */

export const programLevelLabels: Record<ProgramLevel, string> = {
  licence: 'Licence',
  master: 'Master',
  distance: 'À distance',
}

export const programDomainLabels: Record<ProgramDomain, string> = {
  gestion: 'Gestion',
  commerce: 'Commerce',
  marketing: 'Marketing',
  economie: 'Économie',
  finances: 'Finances',
  management: 'Management',
}

type ProgramSeed = Omit<Program, 'id' | 'slug' | 'status'> & Partial<Pick<Program, 'status'>>

const seeds: ProgramSeed[] = [
  { level: 'licence', domain: 'gestion', title: 'Finances et Comptabilité', admission: 'Bac A2, OSE, D, C, Techniques (sauf G1)' },
  { level: 'licence', domain: 'gestion', title: 'Gestion des Ressources Humaines', admission: 'Bac toutes séries' },
  { level: 'licence', domain: 'gestion', title: 'Progiciel de Gestion Intégrée', admission: 'Bac OSE, D, C, Techniques (sauf G1)' },
  { level: 'licence', domain: 'gestion', title: 'Management', admission: 'Bac toutes séries' },
  { level: 'licence', domain: 'commerce', title: 'Commerce International', admission: 'Bac toutes séries' },
  { level: 'licence', domain: 'commerce', title: 'Marketing et Communication', admission: 'Bac toutes séries' },
  { level: 'licence', domain: 'economie', title: 'Économie Générale', admission: 'Bac A2, OSE, D, C, Techniques (sauf G1)' },
  { level: 'master', domain: 'finances', title: 'Finances d’Entreprise', admission: 'Mention Finances' },
  { level: 'master', domain: 'finances', title: 'Comptabilité, Contrôle et Audit', admission: 'Mention Finances' },
  { level: 'master', domain: 'marketing', title: 'Marketing et Communication', admission: 'Mention Marketing' },
  { level: 'master', domain: 'marketing', title: 'Commerce International', admission: 'Mention Marketing' },
  { level: 'master', domain: 'management', title: 'Ressources Humaines', admission: 'Mention Management' },
  { level: 'master', domain: 'management', title: 'MBA : Management of Business Administration', admission: 'Mention Management' },
  { level: 'master', domain: 'economie', title: 'Économie Internationale, Finances et Modélisation', admission: 'Mention Économie' },
  { level: 'master', domain: 'economie', title: 'Banque, Microfinance et Assurance', admission: 'Mention Économie' },
  { level: 'master', domain: 'economie', title: 'Économie de Développement Durable et Territorial', admission: 'Mention Économie' },
  { level: 'master', domain: 'economie', title: 'Expertise économique', admission: 'Mention Économie' },
  { level: 'distance', domain: 'gestion', title: 'Licence Gestion', admission: 'Formation à distance' },
  { level: 'distance', domain: 'economie', title: 'Licence Économie', admission: 'Formation à distance' },
  { level: 'distance', domain: 'finances', title: 'Master Finances publiques', admission: 'Formation à distance' },
  { level: 'distance', domain: 'management', title: 'Master Management public', admission: 'Formation à distance' },
  // Niveau ambigu dans la brochure « Formation à distance » : listés sans en-tête de niveau, donc non présentés comme des Masters.
  { level: 'distance', domain: 'management', title: 'Gestion des Établissements Hospitaliers', admission: 'Formation à distance', status: 'pending' },
  { level: 'distance', domain: 'economie', title: 'Économie de Développement National', admission: 'Formation à distance', status: 'pending' },
  { level: 'distance', domain: 'management', title: 'Gestion des Ressources Humaines', admission: 'Formation à distance', status: 'pending' },
]

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const programs: Program[] = seeds.map((seed) => {
  const slug = slugify(`${seed.level} ${seed.title}`)
  return { status: 'brochure', ...seed, id: slug, slug }
})
