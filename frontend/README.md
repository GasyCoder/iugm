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
npm run generate       # site statique dans .output/public
npm run verify:static  # contrôle de publication du site généré
```

## Configuration

Copier `.env.example` en `.env` si nécessaire :

- `NUXT_PUBLIC_API_BASE` — adresse publique de l'API Laravel (défaut `http://localhost:8000/api/v1`) ;
- `NUXT_API_BASE_SERVER` — optionnelle, adresse utilisée pendant le rendu serveur ;
- `NUXT_PUBLIC_SITE_URL` — domaine de production (`https://…`) : active la balise canonique, `og:url`, `og:image`,
  le contenu de `sitemap.xml` et la ligne `Sitemap` de `robots.txt`. Ces éléments restent absents ou vides sans cette variable.

## Déploiement statique (Cloudflare Pages)

Le site public est entièrement pré-rendu et n'appelle aucune API. Réglages du projet Cloudflare Pages :

| Réglage | Valeur |
| --- | --- |
| Répertoire racine | `frontend` |
| Commande de build | `npm run generate && npm run verify:static` |
| Répertoire de sortie | `.output/public` |
| `NODE_VERSION` | `22.23.3` |
| `NUXT_PUBLIC_SITE_URL` | domaine de production, à définir |

- `npm run generate` fixe `NITRO_PRESET=static` : sinon, sur Cloudflare, Nitro détecte la plateforme et écrit dans `dist/`.
  Lancer `npx nuxt generate` seul n'est donc pas équivalent sur Cloudflare.
- Ne pas définir `NODE_ENV=production` au build : les modules Nuxt en `devDependencies` doivent être installés.
- `verify:static` fait échouer le build, donc bloque le déploiement, si une fiche manque, si un lien `tel:`/`mailto:` apparaît
  ou si une photographie aux droits non confirmés est présente. Quand l'IUGM validera des coordonnées, assouplir la règle
  `tel:`/`mailto:` dans `scripts/verify-static.mjs`.
- `public/_headers` définit les en-têtes de sécurité et le cache ; `404.html` est servi par Cloudflare avec le statut 404.
- Une nouvelle formation dans `app/data/programs.ts` est pré-rendue automatiquement (`nitro.prerender.routes`).

## Structure

```text
app/
├── assets/css/main.css   # tokens IUGM (Tailwind v4 @theme) + alias shadcn-vue
├── components/
│   ├── home/             # sections de la page d'accueil
│   ├── iugm/             # primitives IUGM (IugmSection, IugmPageHero, IugmContactPanel…)
│   ├── news/, programs/  # cartes (NewsCard, ProgramCard)
│   ├── layout/           # AppHeader, MobileNavigation, AppFooter…
│   └── ui/               # composants shadcn-vue (générés, adaptés aux tokens)
├── composables/          # useProgramFilters, usePrograms, useApiClient…
├── data/                 # données locales typées (à confirmer par l'IUGM)
├── pages/                # /, /formations, /formations/[slug], /admissions, attrape-tout 404
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
- **Admission** : seule la brochure Licence indique des conditions d'accès (`documentedAdmission` dans `app/utils/programs.ts`).
  Le champ `admission` d'un Master ou d'une formation à distance est une mention ou une modalité, jamais une condition.

## Dette connue

`npm audit` signale 38 vulnérabilités transitives (34 moderate, 4 low, 0 high/critical) dans
l'outillage de build et de lint (`minimatch`, `glob`, `deepmerge`, chaîne ESLint/Nitro). Le seul
correctif proposé rétrograde Nuxt (4.1.3) : il n'est pas appliqué. Ne pas lancer `npm audit fix --force`.
