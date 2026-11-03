# IUGM — Frontend Nuxt

Site public de l'IUGM : Nuxt 4, Vue 3, TypeScript strict, Tailwind CSS v4, shadcn-vue.
Le backend Laravel (API `/api/v1`) est à la racine du dépôt.

## Prérequis

- Node `^22.22.3` (voir `.nvmrc` : `nvm use`).
- npm. `.npmrc` désactive les scripts d'installation (`ignore-scripts=true`) :
  après `npm install`, générer les types Nuxt avec `npx nuxt prepare`.

## Commandes

```bash
npm install && npx nuxt prepare
npm run dev         # http://localhost:3000
npm run typecheck
npm run lint
npm run test        # Vitest (tests/unit)
npm run build
npm run preview
```

## Configuration

Copier `.env.example` en `.env` si nécessaire :

- `NUXT_PUBLIC_API_BASE` — adresse publique de l'API Laravel (défaut `http://localhost:8000/api/v1`) ;
- `NUXT_API_BASE_SERVER` — optionnelle, adresse utilisée pendant le rendu serveur.

## Structure

```text
app/
├── assets/css/main.css   # tokens IUGM (Tailwind v4 @theme) + alias shadcn-vue
├── components/
│   ├── home/             # sections de la page d'accueil
│   ├── iugm/             # primitives IUGM (IugmSection, IugmSectionHeading…)
│   ├── news/, programs/  # cartes (NewsCard, ProgramCard)
│   ├── layout/           # AppHeader, MobileNavigation, AppFooter…
│   └── ui/               # composants shadcn-vue (générés, adaptés aux tokens)
├── composables/          # useProgramFilters, usePrograms, useApiClient…
├── data/                 # données locales typées du prototype (à confirmer par l'IUGM)
├── services/             # accès aux données (local aujourd'hui, API Laravel ensuite)
├── types/
└── utils/
```

Référence visuelle : `../design/IUGM Accueil v2.dc.html` (lecture seule),
complétée par `../design/IUGM Fondations.dc.html`.

## Photographies institutionnelles

Les photographies utilisées dans le prototype Claude Design ne sont pas publiées dans le dépôt Git public tant que leurs droits de diffusion ne sont pas confirmés.

Les emplacements correspondants utilisent temporairement des placeholders. Le Hero conserve sa composition et ses dégradés sur un fond graphique aux couleurs IUGM.

Les fichiers originaux restent uniquement dans les ressources locales de conception et ne doivent pas être publiés sans autorisation.

Leurs métadonnées restent dans `app/data/media.ts` : nom du fichier source local (`source`),
dimensions, description, droits `pending` et crédits connus. `assetAvailable: false` indique
qu'aucun fichier n'est distribué ; aucune URL publique ne vise ces photographies.
Les fichiers `promotion-hery-miray.jpg` et `remise-diplomes.jpg` portent le copyright EXIF « Mim'SARY ».
Les originaux et leurs EXIF sont conservés intacts. Les droits restent à confirmer pour les quatre photographies,
y compris `stand-equipe.jpg` et `stand-salon.jpg`.

## Contraintes de publication

- **Photographies** : absentes du dépôt public. Leur réintégration et leur publication en production
  restent interdites tant que les droits ne sont pas confirmés par écrit (`rights: 'pending'` dans
  `app/data/media.ts`, crédit « Mim'SARY » sur deux fichiers).
- **Coordonnées** : tant qu'elles ne sont pas `verified`, téléphones et email sont affichés sans lien
  `tel:` / `mailto:` (règle unique dans `app/utils/contact.ts`).
- **Données institutionnelles** : tout contenu `pending` reste signalé « À CONFIRMER PAR L'IUGM ».

## Dette connue

`npm audit` signale 38 vulnérabilités transitives (34 moderate, 4 low, 0 high/critical) dans
l'outillage de build et de lint (`minimatch`, `glob`, `deepmerge`, chaîne ESLint/Nitro). Le seul
correctif proposé rétrograde Nuxt (4.1.3) : il n'est pas appliqué. Ne pas lancer `npm audit fix --force`.
