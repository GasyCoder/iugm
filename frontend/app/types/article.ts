import type { VerificationStatus } from './content'

export interface ArticleMilestone {
  period: string
  title: string
  text: string
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
  /** Étapes datées, affichées en frise. */
  milestones?: ArticleMilestone[]
}

export interface Article {
  slug: string
  category: string
  title: string
  subtitle: string
  /** Date du communiqué, AAAA-MM-JJ. */
  date: string
  place: string
  /** Chapeau. */
  lead: string
  sections: ArticleSection[]
  /** Album de la galerie illustrant l'article ; sa première photo sert de couverture. */
  albumSlug?: string
  /** Formule finale en malgache (lang="mg"). */
  closingMg?: string
  /** Seules les actualités `verified` sont publiées. */
  status: VerificationStatus
}
