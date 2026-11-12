<script setup lang="ts">
import type { Article } from '~/types/article'
import { ArrowRight } from '@lucide/vue'

const props = defineProps<{
  article: Article
  /** h2 sur la page Actualités, h3 dans une section de l'accueil. */
  headingLevel?: 'h2' | 'h3'
}>()

const cover = computed(() => articlePhotos(props.article)[0])
</script>

<template>
  <Card class="group relative h-full gap-0 pt-0 transition-shadow duration-150 ease-out-soft hover:shadow-md">
    <div
      v-if="cover"
      class="aspect-video overflow-hidden bg-surface-muted"
    >
      <!-- Image décorative : le titre du lien nomme l'actualité. -->
      <img
        :src="gallerySrc(cover, 960)"
        :srcset="gallerySrcset(cover)"
        sizes="(min-width: 64rem) 36rem, 100vw"
        alt=""
        :width="cover.image.width"
        :height="cover.image.height"
        loading="lazy"
        decoding="async"
        :style="{ objectPosition: cover.position }"
        class="size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transition-none"
      >
    </div>
    <CardContent class="flex flex-1 flex-col gap-3 pt-5">
      <div class="flex flex-wrap items-center gap-2 text-[13px] text-foreground-muted">
        <Badge variant="accent">
          {{ article.category }}
        </Badge>
        <time :datetime="article.date">{{ formatLongDate(article.date) }}</time>
      </div>
      <component
        :is="headingLevel ?? 'h2'"
        class="m-0 text-lg leading-snug font-semibold text-balance"
      >
        <!-- Lien étendu à toute la carte (after:inset-0). -->
        <NuxtLink
          :to="`/actualites/${article.slug}`"
          class="text-foreground no-underline after:absolute after:inset-0 after:rounded-xl group-hover:text-primary hover:text-primary"
        >
          {{ article.title }}
        </NuxtLink>
      </component>
      <p class="m-0 text-sm leading-relaxed text-foreground-muted">
        {{ article.subtitle }}
      </p>
      <span class="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Lire l’article
        <ArrowRight
          class="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </CardContent>
  </Card>
</template>
