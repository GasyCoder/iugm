<script setup lang="ts">
import { CircleCheck } from '@lucide/vue'
import AnnouncementCard from '~/components/announcements/AnnouncementCard.vue'

/**
 * Annonces en cours sur l'accueil : la plus récente avec son affiche en entier, les suivantes en cartes.
 * La section disparaît quand il n'y en a aucune.
 */
const { active } = useAnnouncements()
const featured = computed(() => active.value[0])
const others = computed(() => active.value.slice(1, 3))
</script>

<template>
  <IugmSection
    v-if="featured"
    id="annonces"
    labelledby="annonces-title"
    tone="muted"
    content-class="flex flex-col gap-8"
  >
    <div class="flex flex-wrap items-end justify-between gap-4">
      <IugmSectionHeading
        id="annonces-title"
        title="Flash"
        highlight="info"
      />
      <IugmArrowLink
        to="/annonces"
        variant="ghost"
      >
        Toutes les annonces
      </IugmArrowLink>
    </div>

    <article
      class="grid grid-cols-1 items-center gap-8 lg:gap-12"
      :class="featured.image ? 'md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]' : undefined"
    >
      <!-- Affiche en entier, sans recadrage. -->
      <NuxtLink
        v-if="featured.image"
        :to="`/annonces/${featured.slug}`"
        class="block overflow-hidden rounded-2xl bg-background shadow-md ring-1 ring-border transition-shadow duration-150 hover:shadow-lg"
      >
        <img
          :src="announcementSrc(featured.image, featured.image.widths.at(-1))"
          :srcset="announcementSrcset(featured.image)"
          sizes="(min-width: 64rem) 26rem, (min-width: 48rem) 22rem, 100vw"
          :alt="featured.image.alt"
          :width="featured.image.width"
          :height="featured.image.height"
          loading="lazy"
          decoding="async"
          class="block h-auto w-full"
        >
      </NuxtLink>

      <div class="flex min-w-0 flex-col gap-5">
        <div class="flex flex-wrap items-center gap-2 text-[13px] text-foreground-muted">
          <Badge variant="accent">
            {{ featured.category }}
          </Badge>
          <time :datetime="featured.publishedAt">{{ formatLongDate(featured.publishedAt) }}</time>
        </div>
        <h3 class="m-0 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          {{ featured.title }}
        </h3>
        <p class="m-0 leading-relaxed text-pretty text-foreground-muted">
          {{ featured.summary }}
        </p>
        <ul
          v-if="featured.highlights.length > 0"
          class="m-0 flex list-none flex-col gap-2.5 p-0"
        >
          <li
            v-for="point in featured.highlights"
            :key="point"
            class="flex gap-3 text-[15px] leading-snug"
          >
            <CircleCheck
              class="mt-0.5 size-5 shrink-0 text-success"
              aria-hidden="true"
            />
            {{ point }}
          </li>
        </ul>
        <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
          <IugmArrowLink :to="`/annonces/${featured.slug}`">
            Lire l’annonce
          </IugmArrowLink>
          <IugmArrowLink
            v-if="featured.action"
            :to="featured.action.to"
            variant="outline"
          >
            {{ featured.action.label }}
          </IugmArrowLink>
        </div>
      </div>
    </article>

    <ul
      v-if="others.length > 0"
      class="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2"
    >
      <li
        v-for="item in others"
        :key="item.slug"
      >
        <AnnouncementCard
          :announcement="item"
          heading-level="h3"
        />
      </li>
    </ul>
  </IugmSection>
</template>
