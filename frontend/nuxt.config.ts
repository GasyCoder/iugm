import tailwindcss from '@tailwindcss/vite'
import { programs } from './app/data/programs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', 'shadcn-nuxt'],

  // Le site public n'appelle aucune API : pas d'adresse locale dans le HTML de production.
  $production: {
    runtimeConfig: {
      public: {
        apiBase: '',
      },
    },
  },

  components: [
    // <AppHeader>, <AppFooter>… sans préfixe « Layout ».
    { path: '~/components/layout', pathPrefix: false },
    // Les composants shadcn-vue (components/ui) sont enregistrés par shadcn-nuxt.
    { path: '~/components', ignore: ['ui/**'] },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      // iOS transformerait sinon les numéros non vérifiés en liens d'appel (voir utils/contact.ts).
      meta: [{ name: 'format-detection', content: 'telephone=no, email=no, address=no' }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // NUXT_API_BASE_SERVER — adresse de l'API utilisée pendant le rendu serveur (optionnelle).
    apiBaseServer: '',
    public: {
      // NUXT_PUBLIC_API_BASE — adresse publique de l'API Laravel.
      apiBase: 'http://localhost:8000/api/v1',
      // NUXT_PUBLIC_SITE_URL — domaine de production (canonique, sitemap, robots). Vide : balises non émises.
      siteUrl: '',
    },
  },

  // Un lien n'est préchargé qu'au survol ou au toucher : les 24 cartes visibles ne déclenchent aucun téléchargement.
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: { interaction: true, visibility: false },
      },
    },
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    prerender: {
      // Les fiches sont listées explicitement : le crawler seul ne garantit pas de toutes les découvrir.
      routes: [
        '/',
        '/formations',
        '/admissions',
        '/robots.txt',
        '/sitemap.xml',
        ...programs.map(program => `/formations/${program.slug}`),
      ],
      crawlLinks: true,
      failOnError: true,
      // formations/x.html plutôt que formations/x/index.html : Cloudflare Pages sert /formations/x sans redirection.
      autoSubfolderIndex: false,
      // Cloudflare Pages utilise 404.html ; 200.html publierait une coquille vide en HTTP 200.
      ignore: ['/200.html'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    defaults: {
      subsets: ['latin'],
    },
    families: [
      // Seule la police du Hero est préchargée : les autres arrivent en font-display: swap, avec un fallback aux métriques ajustées.
      { name: 'Schibsted Grotesk', provider: 'google', weights: [400, 500, 600, 700, 800], styles: ['normal'], preload: true },
      { name: 'Newsreader', provider: 'google', weights: [400, 500], styles: ['italic'] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500], styles: ['normal'] },
    ],
  },

  image: {
    quality: 75,
    format: ['avif', 'webp'],
  },

  shadcn: {
    prefix: '',
    componentDir: '~/components/ui',
  },
})
