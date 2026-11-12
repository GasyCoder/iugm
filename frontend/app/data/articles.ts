import type { Article } from '../types/article'

/**
 * Actualités publiées sur /actualites.
 * Ajouter une actualité : une entrée ici (status 'verified' pour la publier), les photos dans un album de data/gallery.ts,
 * puis régénérer et publier le site.
 */
export const articles: Article[] = [
  {
    // Communiqué de l'Université de Mahajanga transmis par le responsable du projet le 12 novembre 2026 (version française).
    slug: 'erasmus-hei-blue-umg-ile-maurice',
    category: 'International',
    title: 'Erasmus+ HEI-Blue : l’Université de Mahajanga à l’honneur à l’île Maurice',
    subtitle: 'Une jeune étudiante de l’UMG porte haut les couleurs de Madagascar et les valeurs ancestrales malagasy.',
    date: '2026-10-29',
    place: 'Mahajanga',
    lead: 'À la veille de sa participation à la conférence finale du projet Erasmus+ HEI-Blue, prévue du 10 au 12 novembre 2026 à l’île Maurice, RASOARIFETRA Jennifer Prisca, étudiante en Master 2, parcours Économie, à l’Institut Universitaire de Gestion et de Management (IUGM), a effectué deux visites de courtoisie : l’une auprès du Dr TSIASAINA Razafindravelo Gerald, Directeur par intérim de l’IUGM, l’autre auprès du Professeur RANDRIANAMBININA Blanchard, Président de l’Université de Mahajanga (UMG).',
    sections: [
      {
        heading: 'Un parcours d’excellence en trois étapes',
        paragraphs: [],
        milestones: [
          {
            period: '2025',
            title: 'Formation et sélection',
            text: 'Parmi les 24 étudiants de l’UMG formés au montage de projets entrepreneuriaux dans l’économie bleue, RASOARIFETRA Jennifer Prisca s’est distinguée en figurant parmi les quatre meilleurs porteurs de projets.',
          },
          {
            period: 'Avril 2026',
            title: 'Bootcamp international à l’île Maurice',
            text: 'Aux côtés des trois autres étudiants sélectionnés, elle a participé au Bootcamp HEI-Blue, à l’issue duquel un jury international l’a désignée pour représenter l’UMG à la conférence finale.',
          },
          {
            period: '10–12 novembre 2026',
            title: 'Conférence finale à l’île Maurice',
            text: 'RASOARIFETRA Jennifer Prisca présentera son projet lors de la cérémonie officielle de remise des prix, devant des partenaires universitaires, institutionnels et financiers. Cette rencontre, organisée sous l’égide de la Commission de l’océan Indien (COI), permettra de valoriser les résultats du projet HEI-Blue, de promouvoir l’entrepreneuriat bleu et d’explorer des perspectives de coopération et de financement. Elle bénéficiera également d’un mentorat international pour concrétiser son initiative.',
          },
        ],
      },
      {
        heading: 'Le Tsodrano des Ray aman-dreny : une tradition malagasy honorée',
        paragraphs: [
          'Fidèle au Soatoavina et au respect des valeurs ancestrales malagasy, RASOARIFETRA Jennifer Prisca a tenu à solliciter les conseils et le Tsodrano des deux Ray aman-dreny universitaires avant son départ.',
          'Ces derniers l’ont encouragée à faire preuve d’excellence, de responsabilité et de dignité, tout en l’exhortant à porter haut le flambeau de l’UMG et à défendre honorablement les couleurs de Madagascar. Ils lui ont accordé leurs bénédictions et leurs meilleurs vœux de réussite.',
        ],
      },
      {
        heading: 'Un accompagnement institutionnel de l’UMG',
        paragraphs: [
          'RASOARIFETRA Jennifer Prisca sera accompagnée par RAZAFINTSALAMA Julien Emile, Enseignant-Chercheur et Coordinateur institutionnel du projet HEI-Blue pour l’UMG. Outre l’encadrement de l’étudiante, il participera à la présentation des réalisations du projet, aux échanges régionaux et aux discussions sur les perspectives de coopération et de pérennisation des initiatives d’économie bleue.',
        ],
      },
      {
        heading: 'Une fierté pour l’UMG et Madagascar',
        paragraphs: [
          'Cette réussite témoigne du potentiel des jeunes talents malagasy et de l’engagement de l’UMG en faveur de l’innovation, de l’entrepreneuriat et de l’internationalisation de l’enseignement supérieur.',
          'L’Université de Mahajanga adresse ses chaleureuses félicitations à RASOARIFETRA Jennifer Prisca et lui souhaite plein succès ! Bon voyage !',
        ],
      },
    ],
    albumSlug: 'erasmus-hei-blue',
    closingMg: 'Mirary soa sy fahombiazana ho an’i RASOARIFETRA Jennifer Prisca !',
    status: 'verified',
  },
]
