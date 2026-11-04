import { programs } from '../../app/data/programs'

/** Sans NUXT_PUBLIC_SITE_URL, le sitemap reste vide : ses adresses doivent être absolues. */
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/+$/, '')
  const paths = ['/formations', '/admissions', ...programs.map(program => `/formations/${program.slug}`)]
  const urls = siteUrl ? [siteUrl, ...paths.map(path => `${siteUrl}${path}`)].map(url => `  <url><loc>${url}</loc></url>`) : []

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n')
})
