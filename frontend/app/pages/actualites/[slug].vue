<script setup lang="ts">
import { articles } from '~/data/articles'
import { findAlbum } from '~/data/gallery'

const route = useRoute()
const found = publishedArticles(articles).find(item => item.slug === String(route.params.slug))

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Actualité introuvable', fatal: true })
}

const article = found
const date = formatLongDate(article.date)
const photos = articlePhotos(article)
const album = article.albumSlug ? findAlbum(article.albumSlug) : undefined

usePageSeo({
  title: article.title,
  description: article.subtitle,
})

/** Photo ouverte dans la visionneuse. */
const opened = ref<number | null>(null)
</script>

<template>
  <div>
    <IugmPageHero
      :eyebrow="`${article.category} · ${article.place}, ${date}`"
      :title="article.title"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Actualités', to: '/actualites' }, { label: article.title }]"
    >
      <p class="m-0 max-w-3xl text-lg leading-relaxed text-pretty text-foreground-muted">
        {{ article.subtitle }}
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
    >
      <article class="flex min-w-0 flex-col gap-10 text-base leading-relaxed">
        <p class="m-0 text-lg font-medium text-pretty">
          <time
            :datetime="article.date"
            class="sr-only"
          >{{ date }}</time>
          {{ article.lead }}
        </p>

        <section
          v-for="(section, sectionIndex) in article.sections"
          :key="section.heading"
          :aria-labelledby="`section-${sectionIndex}`"
          class="flex flex-col gap-4"
        >
          <h2
            :id="`section-${sectionIndex}`"
            class="m-0 text-xl font-semibold tracking-tight text-balance md:text-2xl"
          >
            {{ section.heading }}
          </h2>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
            class="m-0 text-pretty"
          >
            {{ paragraph }}
          </p>
          <ol
            v-if="section.milestones"
            class="m-0 flex list-none flex-col gap-0 border-l-2 border-iugm-blue-200 p-0 pl-6"
          >
            <li
              v-for="milestone in section.milestones"
              :key="milestone.period"
              class="relative flex flex-col gap-1.5 pb-6 last:pb-0"
            >
              <span
                aria-hidden="true"
                class="absolute top-1.5 -left-[calc(1.5rem+7px)] size-3 rounded-full bg-primary ring-4 ring-background"
              />
              <span class="text-sm font-semibold text-accent-text">{{ milestone.period }}</span>
              <h3 class="m-0 text-base font-semibold">
                {{ milestone.title }}
              </h3>
              <p class="m-0 text-pretty text-foreground-muted">
                {{ milestone.text }}
              </p>
            </li>
          </ol>
        </section>

        <p
          v-if="article.closingMg"
          lang="mg"
          class="m-0 rounded-xl border border-iugm-green-200 bg-iugm-green-50 p-5 font-medium text-iugm-green-900"
        >
          {{ article.closingMg }}
        </p>
      </article>

      <aside
        v-if="photos.length > 0"
        aria-labelledby="article-photos"
        class="flex flex-col gap-4 self-start lg:sticky lg:top-24"
      >
        <h2
          id="article-photos"
          class="m-0 text-base font-semibold"
        >
          En images
        </h2>
        <ul class="m-0 grid list-none grid-cols-2 gap-3 p-0">
          <li
            v-for="(photo, index) in photos"
            :key="photo.key"
          >
            <button
              type="button"
              class="group block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface-muted ring-1 ring-border"
              :aria-label="`Agrandir : ${photo.image.alt}`"
              @click="opened = index"
            >
              <img
                :src="gallerySrc(photo)"
                :srcset="gallerySrcset(photo)"
                sizes="(min-width: 64rem) 13rem, 50vw"
                :alt="photo.image.alt"
                :width="photo.image.width"
                :height="photo.image.height"
                :loading="index < 2 ? 'eager' : 'lazy'"
                decoding="async"
                :style="{ objectPosition: photo.position }"
                class="size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transition-none"
              >
            </button>
          </li>
        </ul>
        <IugmArrowLink
          v-if="album"
          :to="`/galerie/${album.slug}`"
          variant="outline"
          size="default"
          class="self-start"
        >
          Voir l’album
        </IugmArrowLink>
      </aside>
    </IugmSection>

    <GalleryLightbox
      v-if="album"
      v-model:index="opened"
      :photos="photos"
      :album-title="album.title"
    />
  </div>
</template>
