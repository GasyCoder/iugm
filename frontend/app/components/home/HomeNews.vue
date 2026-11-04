<script setup lang="ts">
import { publishedNews } from '~/data/home'
</script>

<template>
  <IugmSection
    id="actualites"
    labelledby="actus-title"
    tone="muted"
    content-class="flex flex-col gap-8"
  >
    <IugmSectionHeading
      id="actus-title"
      title="La vie de"
      highlight="l’Institut."
    />

    <div class="grid gap-4 md:grid-cols-3">
      <NewsCard
        v-for="(item, index) in publishedNews"
        :key="item.id"
        v-reveal="index * 100"
        :item="item"
      />
    </div>
  </IugmSection>
</template>
