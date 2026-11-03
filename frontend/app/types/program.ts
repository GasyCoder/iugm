import type { VerificationStatus } from './content'

export type ProgramLevel = 'licence' | 'master' | 'distance'

export type ProgramDomain = 'gestion' | 'commerce' | 'marketing' | 'economie' | 'finances' | 'management'

export interface Program {
  id: string
  slug: string
  title: string
  level: ProgramLevel
  domain: ProgramDomain
  /** Conditions d'accès telles qu'indiquées par la source (séries de bac, mention…). */
  admission: string
  status: VerificationStatus
}

/** `null` = tous les niveaux / tous les domaines. */
export interface ProgramFilters {
  keyword: string
  level: ProgramLevel | null
  domain: ProgramDomain | null
}
