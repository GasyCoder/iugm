<script setup lang="ts">
import type { NewsCategory, NewsItem } from '~/types/content'
import { newsCategoryLabels } from '~/data/home'

defineProps<{
  item: NewsItem
}>()

const categoryClass: Record<NewsCategory, string> = {
  alumni: 'bg-iugm-blue-50 text-primary',
  formation: 'bg-iugm-green-50 text-iugm-green-800',
  event: 'bg-category-event text-category-event-foreground',
}
</script>

<template>
  <!-- Pas de page d'actualité publiée : carte non cliquable. -->
  <Card class="pt-0">
    <IugmImagePlaceholder
      :subject="item.image.alt"
      class="aspect-video w-full"
    />
    <CardHeader class="gap-3">
      <Badge
        variant="outline"
        class="border-transparent"
        :class="categoryClass[item.category]"
      >
        {{ newsCategoryLabels[item.category] }}
      </Badge>
      <CardTitle>
        <h3 class="m-0 text-base leading-snug font-semibold text-balance">
          {{ item.title }}
        </h3>
      </CardTitle>
    </CardHeader>
  </Card>
</template>
