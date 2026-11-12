import type { Article } from '~/types/article'
import type { GalleryPhoto } from '~/types/gallery'
import { findAlbum } from '~/data/gallery'

/** Actualités publiables, de la plus récente à la plus ancienne. */
export function publishedArticles(list: Article[]): Article[] {
  return list
    .filter(item => item.status === 'verified')
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function articlePhotos(article: Article): GalleryPhoto[] {
  return article.albumSlug ? findAlbum(article.albumSlug)?.photos ?? [] : []
}
