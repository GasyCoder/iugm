<script setup lang="ts">
import type { GalleryAlbum } from '~/types/gallery'
import { Images } from '@lucide/vue'

const props = defineProps<{
  album: GalleryAlbum
  /** Titre de carte : h2 sur la page Galerie, h3 sous une autre section. */
  headingLevel?: 'h2' | 'h3'
}>()

const cover = computed(() => props.album.photos[0])
</script>

<template>
  <Card class="group relative h-full gap-0 pt-0 transition-shadow duration-150 ease-out-soft hover:shadow-md">
    <div class="relative aspect-4/3 overflow-hidden bg-surface-muted">
      <!-- Image décorative : le titre du lien nomme déjà l'album. -->
      <img
        v-if="cover"
        :src="gallerySrc(cover)"
        :srcset="gallerySrcset(cover)"
        sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw"
        alt=""
        :width="cover.image.width"
        :height="cover.image.height"
        loading="lazy"
        decoding="async"
        :style="{ objectPosition: cover.position }"
        class="size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transition-none"
      >
      <Badge class="absolute bottom-3 left-3 gap-1.5 bg-background/90 text-foreground">
        <Images
          class="size-3.5"
          aria-hidden="true"
        />
        {{ photoCountLabel(album.photos.length) }}
      </Badge>
    </div>
    <CardContent class="flex flex-col gap-1.5 pt-5">
      <component
        :is="headingLevel ?? 'h2'"
        class="m-0 text-base leading-snug font-semibold text-balance"
      >
        <!-- Lien étendu à toute la carte (after:inset-0). -->
        <NuxtLink
          :to="`/galerie/${album.slug}`"
          class="text-foreground no-underline after:absolute after:inset-0 after:rounded-xl group-hover:text-primary hover:text-primary"
        >
          {{ album.title }}
        </NuxtLink>
      </component>
      <p class="m-0 text-sm text-foreground-muted">
        {{ album.description }}
      </p>
    </CardContent>
  </Card>
</template>
