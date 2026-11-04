import type { ProgramLevel } from '~/types/program'

/**
 * Ce que les brochures disent de l'admission, et rien de plus.
 * Seule la brochure « Niveau Licence » mentionne ces éléments et des séries de bac ;
 * les brochures Master et Formation à distance n'indiquent aucune condition d'accès.
 */
export const licenceBrochureFacts = ['Établissement public', 'Sélection de dossiers', 'Bourse et logement']

export const programSourceLabels: Record<ProgramLevel, string> = {
  licence: 'Brochure IUGM « Niveau Licence »',
  master: 'Brochure IUGM « Niveau Master »',
  distance: 'Brochure IUGM « Formation à distance »',
}

/** Informations absentes des brochures pour l'ensemble des candidatures. */
export const admissionPendingTopics = [
  'Conditions d’accès en Master et en formation à distance',
  'Pièces à fournir et lieu de dépôt du dossier',
  'Calendrier des candidatures et de publication des résultats',
  'Frais de candidature et de scolarité',
  'Conditions d’attribution de la bourse et du logement',
]

/** Informations absentes des brochures pour chaque formation. */
export const programPendingTopics = [
  'Habilitation et diplôme délivré',
  'Durée de la formation',
  'Programme des enseignements',
  'Débouchés professionnels',
  'Site de formation',
  'Frais et calendrier',
]
