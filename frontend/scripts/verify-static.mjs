/**
 * Contrôle de publication de .output/public, à lancer après `npm run generate`.
 * Échoue (code 1) si une page attendue manque ou si une règle de publication est enfreinte :
 * le build Cloudflare Pages s'arrête alors sans déployer.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { announcements } from '../app/data/announcements.ts'
import { articles } from '../app/data/articles.ts'
import { galleryAlbums, galleryImageWidths } from '../app/data/gallery.ts'
import { heroImageWidths, heroSlides, heroThumbnailWidth, media } from '../app/data/media.ts'
import { programs } from '../app/data/programs.ts'

const root = fileURLToPath(new URL('../.output/public/', import.meta.url))
const failures = []

const files = existsSync(root)
  ? readdirSync(root, { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => join(entry.parentPath, entry.name))
  : []
const htmlFiles = files.filter(file => file.endsWith('.html'))

// Pages attendues, et contenu réellement présent dans le HTML (pas une coquille vide).
const expected = [
  ['index.html', 'Former aujourd’hui'],
  ['formations.html', 'Toutes les formations de l’IUGM'],
  ['admissions.html', 'Comment rejoindre l’IUGM'],
  ['404.html', 'Page introuvable'],
  ...programs.map(program => [`formations/${program.slug}.html`, program.title]),
  ['galerie.html', 'Galerie'],
  ...galleryAlbums.map(album => [`galerie/${album.slug}.html`, album.title]),
  ['annonces.html', 'Annonces'],
  ['actualites.html', 'Actualités'],
  ...articles.filter(item => item.status === 'verified').map(item => [`actualites/${item.slug}.html`, item.subtitle]),
]
const publishedAnnouncements = announcements.filter(item => item.status !== 'pending')
for (const item of publishedAnnouncements) {
  expected.push([`annonces/${item.slug}.html`, item.title])
  for (const width of item.image?.widths ?? []) {
    expected.push([`${item.image.base.slice(1)}-${width}.webp`, ''])
  }
}
// Une annonce non validée n'a pas de page.
for (const item of announcements.filter(item => item.status === 'pending')) {
  if (existsSync(join(root, `annonces/${item.slug}.html`))) {
    failures.push(`annonce non validée publiée : ${item.slug}`)
  }
}
for (const slide of heroSlides) {
  for (const width of [heroThumbnailWidth, ...heroImageWidths]) {
    expected.push([`${slide.base.slice(1)}-${width}.webp`, ''])
  }
}
for (const photo of galleryAlbums.flatMap(album => album.photos)) {
  for (const width of galleryImageWidths) {
    expected.push([`${photo.base.slice(1)}-${width}.webp`, ''])
  }
}
for (const width of [320, 640]) {
  expected.push([`images/direction/directeur-${width}.webp`, ''])
}
for (const [file, content] of expected) {
  const path = join(root, file)
  if (!existsSync(path)) {
    failures.push(`fichier absent : ${file}`)
  }
  else if (!readFileSync(path, 'utf8').includes(content)) {
    failures.push(`contenu absent de ${file} : « ${content} »`)
  }
}
for (const file of ['_headers', 'robots.txt']) {
  if (!existsSync(join(root, file))) {
    failures.push(`fichier absent : ${file}`)
  }
}

// Photographies aux droits non confirmés : aucun fichier publié.
const allMedia = [...Object.values(media), ...galleryAlbums.flatMap(album => album.photos.map(photo => photo.image))]
const pendingPhotos = new Set(allMedia.filter(image => image.rights === 'pending').map(image => image.source))
for (const file of files.filter(file => pendingPhotos.has(basename(file)))) {
  failures.push(`photographie non autorisée : ${file}`)
}

// Aucune coordonnée n'est vérifiée à ce jour. À assouplir quand l'IUGM en aura validé.
const forbidden = [
  [/href="(tel|mailto):/, 'coordonnée actionnable'],
  [/localhost|127\.0\.0\.1/, 'adresse locale'],
  [/À CONFIRMER|Prénom Nom|\[nom de/, 'mention ou contenu provisoire'],
  [/<title>[^<]*—/, 'tiret long dans le titre'],
  [/APP_KEY|API_KEY|SECRET|PRIVATE KEY|base64:[A-Za-z0-9+/]{32}/, 'secret potentiel'],
]
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  for (const [pattern, label] of forbidden) {
    if (pattern.test(html)) {
      failures.push(`${label} dans ${file.slice(root.length)}`)
    }
  }
}

if (failures.length > 0) {
  console.error(`✖ ${failures.length} problème(s) :\n${failures.map(failure => `  - ${failure}`).join('\n')}`)
  process.exit(1)
}
console.log(`✔ ${htmlFiles.length} pages vérifiées, dont ${programs.length} fiches formation ; ${heroSlides.length} photos du Hero ; ${galleryAlbums.length} albums ; ${publishedAnnouncements.length} annonce(s) ; ${articles.filter(item => item.status === 'verified').length} actualité(s) ; ${files.length} fichiers publiés.`)
