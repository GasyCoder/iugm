import { readdirSync } from 'node:fs'
import { basename } from 'node:path'
import { describe, expect, it } from 'vitest'
import { news } from '~/data/home'
import { media } from '~/data/media'

const pendingImages = [...Object.values(media), ...news.map(item => item.image)]
  .filter(image => image.rights === 'pending')

describe('photographies aux droits non confirmés', () => {
  it('reste sans URL publique, y compris dans les actualités', () => {
    for (const image of pendingImages) {
      expect(image.assetAvailable).toBe(false)
      expect(image).not.toHaveProperty('src')
    }
  })

  it('ne distribue pas les fichiers sources dans le répertoire public', () => {
    const publicFiles = new Set(readdirSync(new URL('../../public/', import.meta.url), { recursive: true })
      .map(file => basename(file)))

    for (const image of pendingImages) {
      expect(publicFiles.has(image.source)).toBe(false)
    }
  })
})
