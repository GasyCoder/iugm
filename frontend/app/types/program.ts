import type { VerificationStatus } from './content'

export type ProgramLevel = 'licence' | 'master' | 'distance'

export type ProgramDomain = 'gestion' | 'commerce' | 'marketing' | 'economie' | 'finances' | 'management'

export interface Program {
  id: string
  slug: string
  title: string
  level: ProgramLevel
  domain: ProgramDomain
  /**
   * Ligne d'information de la carte : séries de bac (Licence), mention (Master) ou modalité (à distance).
   * Seules les séries de bac sont une condition d'accès : voir `documentedAdmission`.
   */
  admission: string
  status: VerificationStatus
}

/** `null` = tous les niveaux / tous les domaines. */
export interface ProgramFilters {
  keyword: string
  level: ProgramLevel | null
  domain: ProgramDomain | null
}
