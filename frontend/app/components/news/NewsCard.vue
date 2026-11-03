<script setup lang="ts">
import type { NewsCategory, NewsItem } from '~/types/content'
import { newsCategoryLabels } from '~/data/home'

withDefaults(defineProps<{
  item: NewsItem
  /** Mobile : ligne compacte (vignette + titre). Dès md : carte complète. */
  compactOnMobile?: boolean
}>(), {
  compactOnMobile: false,
})

const categoryClass: Record<NewsCategory, string> = {
  alumni: 'bg-iugm-blue-50 text-primary',
  formation: 'bg-iugm-green-50 text-iugm-green-800',
  event: 'bg-category-event text-category-event-foreground',
}
</script>

<template>
  <!-- Pas de page d'actualité publiée : carte non cliquable. -->
  <article
    class="group"
    :class="compactOnMobile
      ? 'grid grid-cols-[6rem_1fr] items-start gap-3.5 border-t border-border py-3.5 md:flex md:flex-col md:gap-3 md:border-0 md:py-0'
      : 'flex flex-col gap-3'"
  >
    <IugmImagePlaceholder
      :subject="item.image.alt"
      :bare="compactOnMobile"
      class="aspect-4/3 w-full rounded"
    />
    <div class="flex min-w-0 flex-col gap-2 md:gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="rounded-sm px-2 py-1 text-xs font-semibold"
          :class="categoryClass[item.category]"
        >{{ newsCategoryLabels[item.category] }}</span>
        <IugmPendingTag
          v-if="!item.date"
          label="DATE À CONFIRMER"
        />
      </div>
      <h3
        class="m-0 leading-snug font-bold text-balance"
        :class="compactOnMobile ? 'text-base md:text-lg' : 'text-lg'"
      >
        {{ item.title }}
      </h3>
    </div>
  </article>
</template>
