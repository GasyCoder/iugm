<script setup lang="ts">
import type { Announcement } from '~/types/announcement'
import { ArrowRight } from '@lucide/vue'

defineProps<{
  announcement: Announcement
  /** h2 sur la page Annonces, h3 dans une section de l'accueil. */
  headingLevel?: 'h2' | 'h3'
}>()
</script>

<template>
  <Card class="group relative h-full gap-0 py-0 transition-shadow duration-150 ease-out-soft hover:shadow-md sm:flex-row">
    <div
      v-if="announcement.image"
      class="aspect-3/2 shrink-0 overflow-hidden bg-surface-muted sm:aspect-auto sm:w-44"
    >
      <!-- Image décorative : le titre du lien nomme l'annonce. -->
      <img
        :src="announcementSrc(announcement.image)"
        :srcset="announcementSrcset(announcement.image)"
        sizes="(min-width: 40rem) 11rem, 100vw"
        alt=""
        :width="announcement.image.width"
        :height="announcement.image.height"
        loading="lazy"
        decoding="async"
        class="size-full object-cover object-top"
      >
    </div>
    <div class="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
      <div class="flex flex-wrap items-center gap-2 text-[13px] text-foreground-muted">
        <Badge variant="accent">
          {{ announcement.category }}
        </Badge>
        <time :datetime="announcement.publishedAt">{{ formatLongDate(announcement.publishedAt) }}</time>
      </div>
      <component
        :is="headingLevel ?? 'h2'"
        class="m-0 text-lg leading-snug font-semibold text-balance"
      >
        <!-- Lien étendu à toute la carte (after:inset-0). -->
        <NuxtLink
          :to="`/annonces/${announcement.slug}`"
          class="text-foreground no-underline after:absolute after:inset-0 after:rounded-xl group-hover:text-primary hover:text-primary"
        >
          {{ announcement.title }}
        </NuxtLink>
      </component>
      <p class="m-0 text-sm leading-relaxed text-foreground-muted">
        {{ announcement.summary }}
      </p>
      <span class="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Lire l’annonce
        <ArrowRight
          class="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </div>
  </Card>
</template>
