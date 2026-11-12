<script setup lang="ts">
import { CircleCheck } from '@lucide/vue'
import { contacts, institution } from '~/data/institution'

const route = useRoute()
const { published } = useAnnouncements()
const found = published.find(item => item.slug === String(route.params.slug))

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Annonce introuvable', fatal: true })
}

const announcement = found
const date = formatLongDate(announcement.publishedAt)
const mainPhone = contacts.mainPhones[0]

usePageSeo({
  title: announcement.title,
  description: `${announcement.summary} Annonce de l’${institution.acronym} du ${date}.`,
})
</script>

<template>
  <div>
    <IugmPageHero
      :eyebrow="`${announcement.category} · ${date}`"
      :title="announcement.title"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Annonces', to: '/annonces' }, { label: announcement.title }]"
    />

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16"
    >
      <article class="flex min-w-0 flex-col gap-8">
        <div class="flex flex-col gap-4 text-base leading-relaxed">
          <p class="m-0 text-lg font-medium text-pretty">
            {{ announcement.summary }}
          </p>
          <p
            v-for="paragraph in announcement.body"
            :key="paragraph"
            class="m-0 text-pretty"
          >
            {{ paragraph }}
          </p>
        </div>

        <section
          v-if="announcement.highlights.length > 0"
          aria-labelledby="annonce-points"
          class="flex flex-col gap-4"
        >
          <h2
            id="annonce-points"
            class="m-0 text-xl font-semibold tracking-tight"
          >
            Points clés
          </h2>
          <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            <li
              v-for="point in announcement.highlights"
              :key="point"
              class="flex gap-3 rounded-xl border bg-card p-4 text-[15px] leading-snug"
            >
              <CircleCheck
                class="mt-0.5 size-5 shrink-0 text-success"
                aria-hidden="true"
              />
              {{ point }}
            </li>
          </ul>
        </section>

        <div class="flex flex-col gap-4 rounded-xl border border-iugm-blue-200 bg-accent p-5 sm:flex-row sm:items-center sm:justify-between">
          <p
            v-if="mainPhone"
            class="m-0 text-[15px] text-accent-foreground"
          >
            Renseignements auprès de l’IUGM&#8239;:
            <IugmContactLink
              :point="mainPhone"
              class="font-semibold whitespace-nowrap"
            />
          </p>
          <IugmArrowLink
            v-if="announcement.action"
            :to="announcement.action.to"
            class="shrink-0"
          >
            {{ announcement.action.label }}
          </IugmArrowLink>
        </div>
      </article>

      <figure
        v-if="announcement.image"
        class="m-0 flex flex-col gap-3 self-start lg:sticky lg:top-24"
      >
        <a
          :href="announcementSrc(announcement.image, announcement.image.widths.at(-1))"
          class="block overflow-hidden rounded-xl ring-1 ring-border"
        >
          <img
            :src="announcementSrc(announcement.image, announcement.image.widths.at(-1))"
            :srcset="announcementSrcset(announcement.image)"
            sizes="(min-width: 64rem) 28rem, 100vw"
            :alt="announcement.image.alt"
            :width="announcement.image.width"
            :height="announcement.image.height"
            class="block h-auto w-full"
          >
        </a>
        <figcaption class="text-sm text-foreground-muted">
          Affiche officielle · touchez ou cliquez pour l’agrandir
        </figcaption>
      </figure>
    </IugmSection>
  </div>
</template>
