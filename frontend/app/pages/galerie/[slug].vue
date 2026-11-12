<script setup lang="ts">
import { findAlbum, galleryAlbums } from '~/data/gallery'
import { institution } from '~/data/institution'

const route = useRoute()
const found = findAlbum(String(route.params.slug))

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Album introuvable', fatal: true })
}

const album = found
const otherAlbums = galleryAlbums.filter(item => item.slug !== album.slug)

usePageSeo({
  title: `${album.title} · Galerie`,
  description: `${album.description} Album photo de l’${institution.acronym}, ${photoCountLabel(album.photos.length)}.`,
})

/** Photo ouverte dans la visionneuse. */
const opened = ref<number | null>(null)
</script>

<template>
  <div>
    <IugmPageHero
      :eyebrow="photoCountLabel(album.photos.length)"
      :title="album.title"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Galerie', to: '/galerie' }, { label: album.title }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        {{ album.description }}
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="pt-10"
    >
      <h2 class="sr-only">
        Photos de l’album
      </h2>
      <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(photo, index) in album.photos"
          :key="photo.key"
        >
          <button
            type="button"
            class="group block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface-muted ring-1 ring-border"
            :aria-label="`Agrandir : ${photo.image.alt}`"
            @click="opened = index"
          >
            <img
              :src="gallerySrc(photo)"
              :srcset="gallerySrcset(photo)"
              sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw"
              :alt="photo.image.alt"
              :width="photo.image.width"
              :height="photo.image.height"
              :loading="index < 3 ? 'eager' : 'lazy'"
              decoding="async"
              :style="{ objectPosition: photo.position }"
              class="size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transition-none"
            >
          </button>
        </li>
      </ul>
    </IugmSection>

    <IugmSection
      v-if="otherAlbums.length > 0"
      tone="muted"
      labelledby="autres-albums"
      content-class="flex flex-col gap-8"
    >
      <h2
        id="autres-albums"
        class="m-0 text-2xl font-semibold tracking-tight"
      >
        Autres albums
      </h2>
      <ul class="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in otherAlbums"
          :key="item.slug"
        >
          <GalleryAlbumCard
            :album="item"
            heading-level="h3"
          />
        </li>
      </ul>
    </IugmSection>

    <GalleryLightbox
      v-model:index="opened"
      :photos="album.photos"
      :album-title="album.title"
    />
  </div>
</template>
