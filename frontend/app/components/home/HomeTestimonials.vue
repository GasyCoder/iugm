<script setup lang="ts">
import type { TestimonialCategory } from '~/types/content'
import { Quote } from '@lucide/vue'
import { publishedTestimonials, testimonialCategoryLabels } from '~/data/home'

// Filtres limités aux catégories pour lesquelles un témoignage existe.
const categories = [...new Set(publishedTestimonials.map(item => item.category))]
const activeCategory = ref<TestimonialCategory | null>(null)
const visible = computed(() =>
  activeCategory.value ? publishedTestimonials.filter(item => item.category === activeCategory.value) : publishedTestimonials,
)
</script>

<template>
  <IugmSection
    id="temoignages"
    labelledby="temoignages-title"
    content-class="flex flex-col gap-8"
  >
    <div class="flex flex-wrap items-end justify-between gap-6">
      <IugmSectionHeading
        id="temoignages-title"
        title="Ils racontent"
        highlight="l’IUGM."
      />
      <div
        role="group"
        aria-label="Filtrer les témoignages"
        class="flex flex-wrap gap-2"
      >
        <Button
          size="sm"
          :variant="activeCategory === null ? 'default' : 'outline'"
          :aria-pressed="activeCategory === null"
          @click="activeCategory = null"
        >
          Tous
        </Button>
        <Button
          v-for="category in categories"
          :key="category"
          size="sm"
          :variant="activeCategory === category ? 'default' : 'outline'"
          :aria-pressed="activeCategory === category"
          @click="activeCategory = category"
        >
          {{ testimonialCategoryLabels[category] }}
        </Button>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <Card
        v-for="item in visible"
        :key="item.id"
      >
        <figure class="m-0 flex h-full flex-col justify-between gap-6 px-6">
          <blockquote class="m-0 flex flex-col gap-3">
            <Quote
              class="size-6 text-secondary"
              aria-hidden="true"
            />
            <p class="m-0 text-base leading-relaxed">
              {{ item.quote }}
            </p>
          </blockquote>
          <figcaption class="flex flex-col border-t pt-4">
            <span class="text-sm font-semibold">{{ item.author }}</span>
            <span class="text-xs text-foreground-muted">{{ item.role }}</span>
          </figcaption>
        </figure>
      </Card>
    </div>
  </IugmSection>
</template>
