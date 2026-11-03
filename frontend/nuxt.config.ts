import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', 'shadcn-nuxt'],

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
    },
  },

  compatibilityDate: '2025-07-15',

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
      // Le Hero est désormais textuel : charger ses fontes avant le premier affichage évite un saut de composition.
      preload: true,
    },
    families: [
      { name: 'Schibsted Grotesk', provider: 'google', weights: [400, 500, 600, 700, 800], styles: ['normal'] },
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
