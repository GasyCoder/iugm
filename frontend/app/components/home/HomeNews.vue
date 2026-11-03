<script setup lang="ts">
import { news } from '~/data/home'
</script>

<template>
  <IugmSection
    id="actualites"
    labelledby="actus-title"
    content-class="flex flex-col gap-8"
  >
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <IugmSectionHeading
        id="actus-title"
        eyebrow="Actualités"
        title="La vie de l’Institut."
      />
      <IugmPendingTag label="ACTUALITÉS DU PROTOTYPE · À CONFIRMER PAR L’IUGM" />
    </div>

    <!-- Mobile : 1 actualité principale + secondaires compactes (Fondations). -->
    <div class="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-6">
      <NewsCard
        v-for="(item, index) in news"
        :key="item.id"
        v-reveal="index * 100"
        :item="item"
        :compact-on-mobile="index > 0"
        :class="index === 0 ? 'mb-5 md:mb-0' : undefined"
      />
    </div>
  </IugmSection>
</template>
