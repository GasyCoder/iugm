<script setup lang="ts">
import { galleryAlbums } from '~/data/gallery'
import { institution } from '~/data/institution'

usePageSeo({
  title: 'Galerie',
  description: `Albums photo de l’${institution.acronym} : ${galleryAlbums.map(album => album.title.toLowerCase()).join(', ')}.`,
})
</script>

<template>
  <div>
    <IugmPageHero
      title="Galerie"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Galerie' }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        La vie de l’Institut en images, rassemblée par albums.
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="pt-10"
    >
      <ul class="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="album in galleryAlbums"
          :key="album.slug"
        >
          <GalleryAlbumCard :album="album" />
        </li>
      </ul>
    </IugmSection>
  </div>
</template>
