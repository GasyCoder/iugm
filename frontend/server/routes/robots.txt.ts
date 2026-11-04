/** robots.txt pré-rendu : la ligne Sitemap n'existe que si le domaine de production est configuré. */
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/+$/, '')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return ['User-Agent: *', 'Disallow:', ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []), ''].join('\n')
})
