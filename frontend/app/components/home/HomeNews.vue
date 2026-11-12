<script setup lang="ts">
import ArticleCard from '~/components/news/ArticleCard.vue'
import { articles } from '~/data/articles'

const latest = publishedArticles(articles).slice(0, 3)
</script>

<template>
  <IugmSection
    id="actualites"
    labelledby="actus-title"
    tone="muted"
    content-class="flex flex-col gap-8"
  >
    <div class="flex flex-wrap items-end justify-between gap-4">
      <IugmSectionHeading
        id="actus-title"
        title="La vie de"
        highlight="l’Institut."
      />
      <IugmArrowLink
        to="/actualites"
        variant="ghost"
      >
        Toutes les actualités
      </IugmArrowLink>
    </div>

    <ul class="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(item, index) in latest"
        :key="item.slug"
        v-reveal="index * 100"
      >
        <ArticleCard
          :article="item"
          heading-level="h3"
        />
      </li>
    </ul>
  </IugmSection>
</template>
