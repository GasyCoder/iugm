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
- `verify:static` fait échouer le build, donc bloque le déploiement, si une fiche ou une photo du Hero manque, si un lien `tel:`/`mailto:`
  ou une mention provisoire apparaît, ou si une photographie `rights: 'pending'` est présente. Quand l'IUGM validera des coordonnées, assouplir la règle
  `tel:`/`mailto:` dans `scripts/verify-static.mjs`.
- `public/_headers` définit les en-têtes de sécurité et le cache ; `404.html` est servi par Cloudflare avec le statut 404.
- Une nouvelle formation dans `app/data/programs.ts` est pré-rendue automatiquement (`nitro.prerender.routes`).

## Structure

```text
app/
├── assets/css/main.css   # tokens IUGM (Tailwind v4 @theme) + alias shadcn-vue
├── components/           # interface construite sur shadcn-vue (components/ui)
│   ├── home/             # sections de la page d'accueil
│   ├── iugm/             # primitives IUGM (IugmSection, IugmPageHero, IugmContactPanel…)
│   ├── news/, programs/  # cartes (NewsCard, ProgramCard)
│   ├── layout/           # AppAnnouncementBar, AppHeader, AppMobileTabBar, MobileNavigation, AppFooter…
│   └── ui/               # composants shadcn-vue (générés, adaptés aux tokens)
├── composables/          # useProgramFilters, usePrograms, useApiClient…
├── data/                 # données locales typées (à confirmer par l'IUGM)
├── pages/                # /, /formations, /formations/[slug], /admissions, attrape-tout 404
├── services/             # accès aux données (local aujourd'hui, API Laravel ensuite)
├── types/
└── utils/
```

Référence visuelle : le portail EDEN de l'Université de Mahajanga (voir `../docs/UI_SYSTEM.md`),
avec les couleurs du logo IUGM. Les tokens sont dans `app/assets/css/main.css`.

## Photographies institutionnelles

Le diaporama du Hero publie quatre photographies (`public/images/hero`), à la demande du responsable du projet.
Leurs métadonnées et leur statut sont dans `app/data/media.ts` (`rights: 'project-approved'`).
Cette décision ne vaut pas accord écrit : il reste à joindre celui des personnes photographiées et celui de Mim'SARY,
titulaire du copyright EXIF de `promotion-hery-miray.jpg` et `remise-diplomes.jpg`. Ce crédit est affiché dans la légende et conservé dans les fichiers publiés.

Les originaux restent dans les ressources locales de conception. Pour remplacer ou ajouter une photo, générer ses déclinaisons
WebP en 160, 480, 800 et 1280 px, sous le nom `{base}-{largeur}.webp`, puis la déclarer dans `heroSlides`.
Le portrait du Directeur est dans `public/images/direction`.

## Contraintes de publication

- **Photographies** : une image `rights: 'pending'` ne doit jamais être publiée (contrôlé par `verify:static`).
  Voir « Photographies institutionnelles » pour celles du Hero.
- **Coordonnées** : tant qu'elles ne sont pas `verified`, téléphones et email sont affichés sans lien
  `tel:` / `mailto:` ; une coordonnée `pending` (sans source) n'est pas affichée (règles dans `app/utils/contact.ts`).
- **Données institutionnelles** : les pages n'affichent pas de mention « À CONFIRMER » (voir `../docs/UI_SYSTEM.md`).
  Témoignages et actualités n'apparaissent qu'avec `status: 'verified'` ; leurs sections restent masquées sinon.
- **Admission** : seule la brochure Licence indique des conditions d'accès (`documentedAdmission` dans `app/utils/programs.ts`).
  Les autres fiches renvoient vers l'IUGM.
  Le champ `admission` d'un Master ou d'une formation à distance est une mention ou une modalité, jamais une condition.

## Dette connue

`npm audit` signale 38 vulnérabilités transitives (34 moderate, 4 low, 0 high/critical) dans
l'outillage de build et de lint (`minimatch`, `glob`, `deepmerge`, chaîne ESLint/Nitro). Le seul
correctif proposé rétrograde Nuxt (4.1.3) : il n'est pas appliqué. Ne pas lancer `npm audit fix --force`.
