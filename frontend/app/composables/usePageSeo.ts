import { institution } from '~/data/institution'
import { logo } from '~/data/media'

/**
 * Métadonnées d'une page. Canonique et URL absolues ne sont émises que si
 * NUXT_PUBLIC_SITE_URL est défini : le domaine de production n'est pas présumé.
 */
export function usePageSeo(options: { title?: string, description: string, noindex?: boolean }) {
  const route = useRoute()
  const { siteUrl } = useRuntimeConfig().public
  const socialTitle = options.title
    ? `${options.title} · ${institution.acronym}`
    : `${institution.acronym} | ${institution.name}`
  const canonical = siteUrl && !options.noindex ? new URL(route.path, siteUrl).href : undefined

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: socialTitle,
    ogDescription: options.description,
    ogUrl: canonical,
    ogImage: siteUrl ? new URL(logo.fallbackSrc, siteUrl).href : undefined,
    twitterCard: 'summary',
    robots: options.noindex ? 'noindex' : undefined,
  })

  useHead({
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  })
}
