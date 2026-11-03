<script setup lang="ts">
import type { TestimonialCategory } from '~/types/content'
import { useScroll } from '@vueuse/core'
import { testimonialCategoryLabels, testimonials } from '~/data/home'

// Filtres limités aux catégories pour lesquelles un emplacement existe.
const categories = [...new Set(testimonials.map(item => item.category))]
const activeCategory = ref<TestimonialCategory | null>(null)
const visible = computed(() =>
  activeCategory.value ? testimonials.filter(item => item.category === activeCategory.value) : testimonials,
)

// Mobile : une carte à la fois (scroll-snap) et indicateur de position.
const track = ref<HTMLElement | null>(null)
const { x } = useScroll(track)
const activeIndex = computed(() => {
  const element = track.value
  const first = element?.firstElementChild
  if (!element || !(first instanceof HTMLElement)) {
    return 0
  }
  const step = first.offsetWidth + Number.parseFloat(getComputedStyle(element).columnGap || '0')
  return Math.min(visible.value.length - 1, Math.round(x.value / step))
})

function scrollToCard(index: number) {
  track.value?.children[index]?.scrollIntoView({ inline: 'start', block: 'nearest' })
}

function selectCategory(category: TestimonialCategory | null) {
  activeCategory.value = category
  track.value?.scrollTo({ left: 0 })
}

const chipClass = 'flex h-9 shrink-0 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-240 ease-out-soft'
const chipState = (selected: boolean) => (selected
  ? 'border-primary-strong bg-primary-strong text-white'
  : 'border-iugm-blue-200 bg-transparent text-foreground hover:border-primary')
</script>

<template>
  <IugmSection
    id="temoignages"
    labelledby="temoignages-title"
    tone="muted"
    content-class="flex flex-col gap-8"
  >
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <IugmSectionHeading
        id="temoignages-title"
        eyebrow="Témoignages"
        title="Ils racontent l’IUGM."
      />
      <div
        role="group"
        aria-label="Filtrer les témoignages"
        class="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0"
      >
        <button
          type="button"
          :aria-pressed="activeCategory === null"
          :class="[chipClass, chipState(activeCategory === null)]"
          @click="selectCategory(null)"
        >
          Tous
        </button>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :aria-pressed="activeCategory === category"
          :class="[chipClass, chipState(activeCategory === category)]"
          @click="selectCategory(category)"
        >
          {{ testimonialCategoryLabels[category] }}
        </button>
      </div>
    </div>

    <IugmPendingTag label="EMPLACEMENTS : TÉMOIGNAGES RÉELS À RECUEILLIR AVEC ACCORD ÉCRIT" />

    <div
      ref="track"
      role="region"
      aria-label="Témoignages"
      tabindex="0"
      class="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-1 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-[1.6fr_1fr]"
      :class="visible.length > 1 ? 'lg:grid-rows-2' : undefined"
    >
      <figure
        v-for="(item, index) in visible"
        :key="item.id"
        class="m-0 w-[86%] shrink-0 snap-start overflow-hidden rounded bg-surface md:w-auto"
        :class="index === 0
          ? 'grid grid-cols-1 md:grid-cols-[16.25rem_1fr] lg:row-span-2'
          : 'flex flex-col gap-4 p-6 md:flex-row'"
      >
        <template v-if="index === 0">
          <IugmImagePlaceholder
            subject="portrait de la personne citée"
            class="min-h-60 md:min-h-full"
          />
          <div class="flex flex-col justify-between gap-6 p-6 md:p-9">
            <blockquote class="m-0 font-serif text-xl leading-snug text-primary-strong italic md:text-2xl">
              {{ item.quote }}
            </blockquote>
            <figcaption>
              <span class="block font-bold">{{ item.author }}</span>
              <span class="text-sm text-foreground-muted">{{ item.role }}</span>
            </figcaption>
          </div>
        </template>
        <template v-else>
          <IugmImagePlaceholder
            subject="portrait"
            bare
            class="size-14 shrink-0 rounded-full"
          />
          <div class="flex flex-col gap-2">
            <blockquote class="m-0 font-serif text-lg leading-snug text-primary-strong italic">
              {{ item.quote }}
            </blockquote>
            <figcaption class="text-sm text-foreground-muted">
              {{ item.author }} · {{ item.role }}
            </figcaption>
          </div>
        </template>
      </figure>
    </div>

    <div
      v-if="visible.length > 1"
      class="flex justify-center gap-1.5 md:hidden"
    >
      <button
        v-for="(item, index) in visible"
        :key="item.id"
        type="button"
        class="flex h-6 cursor-pointer items-center"
        :aria-label="`Témoignage ${index + 1} sur ${visible.length}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="scrollToCard(index)"
      >
        <span
          aria-hidden="true"
          class="block h-1 rounded-sm transition-all duration-240 ease-out-soft"
          :class="index === activeIndex ? 'w-5 bg-primary' : 'w-2 bg-iugm-blue-200'"
        />
      </button>
    </div>
  </IugmSection>
</template>
