<script setup lang="ts">
import type { HeroSlider } from '~/composables/useHeroSlider'
import { ChevronLeft, ChevronRight, Pause, Play } from '@lucide/vue'
import { heroImageWidths, heroSlides } from '~/data/media'

const props = defineProps<{
  slider: HeroSlider
}>()

const sizes = '(min-width: 64rem) 40rem, 100vw'
const srcsetOf = (base: string) => heroImageWidths.map(width => `${base}-${width}.webp ${width}w`).join(', ')
const srcOf = (base: string) => `${base}-${heroImageWidths[1]}.webp`
const firstSlide = heroSlides[0]

const current = computed(() => heroSlides[props.slider.active.value])

// La première photo est l'élément principal de la page sur mobile : la précharger.
useHead({
  link: firstSlide
    ? [{ rel: 'preload', as: 'image', type: 'image/webp', imagesrcset: srcsetOf(firstSlide.base), imagesizes: sizes, fetchpriority: 'high' }]
    : [],
})

// Le survol à la souris et le focus clavier suspendent le défilement ; un toucher ou un clic ne le bloque pas durablement.
function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'mouse') {
    props.slider.setInteracting(true)
  }
}

function onPointerLeave() {
  props.slider.setInteracting(false)
}

function onFocusIn(event: FocusEvent) {
  props.slider.setInteracting((event.target as HTMLElement).matches(':focus-visible'))
}

const controlClass = 'size-8 rounded-full text-white hover:bg-white/15 hover:text-white'
</script>

<template>
  <figure
    class="relative m-0"
    aria-roledescription="carrousel"
    aria-label="Photos de l’IUGM"
  >
    <!-- Cadre décalé et filet tricolore du logo. -->
    <span
      aria-hidden="true"
      class="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-iugm-blue-100 sm:translate-x-4 sm:translate-y-4"
    />
    <span
      aria-hidden="true"
      class="absolute -top-2 right-10 z-20 flex h-1.5 w-24 overflow-hidden rounded-full"
    >
      <span class="flex-3 bg-primary" />
      <span class="flex-1 bg-secondary" />
      <span class="flex-1 bg-baobab" />
    </span>

    <div
      class="relative isolate aspect-4/3 overflow-hidden rounded-2xl bg-iugm-blue-900 shadow-xl focus-on-dark"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
      @focusin="onFocusIn"
      @focusout="slider.setInteracting(false)"
    >
      <template
        v-for="(slide, index) in heroSlides"
        :key="slide.key"
      >
        <div
          v-if="slider.rendered.value.has(index)"
          class="absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out"
          :class="index === slider.active.value ? 'z-10 opacity-100' : 'z-0 opacity-0'"
          :aria-hidden="index === slider.active.value ? undefined : 'true'"
        >
          <img
            :src="srcOf(slide.base)"
            :srcset="srcsetOf(slide.base)"
            :sizes="sizes"
            :alt="slide.image.alt"
            :width="slide.image.width"
            :height="slide.image.height"
            :fetchpriority="index === 0 ? 'high' : undefined"
            :decoding="index === 0 ? 'sync' : 'async'"
            :style="{ objectPosition: slide.position }"
            class="size-full object-cover motion-safe:animate-hero-zoom"
          >
        </div>
      </template>

      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3/5 bg-linear-to-t from-black/75 via-black/30 to-transparent"
      />

      <!-- Progression du diaporama -->
      <div
        aria-hidden="true"
        class="absolute inset-x-4 top-4 z-30 flex gap-1.5 sm:inset-x-6 sm:top-5"
      >
        <span
          v-for="(slide, index) in heroSlides"
          :key="slide.key"
          class="h-1 flex-1 overflow-hidden rounded-full bg-white/35"
        >
          <span
            v-if="index <= slider.active.value"
            :key="`${slide.key}-${slider.active.value}-${slider.playing.value}`"
            data-slide-progress
            class="block h-full origin-left rounded-full bg-white"
            :class="index === slider.active.value && slider.playing.value ? 'animate-hero-progress' : undefined"
            :style="{ animationPlayState: slider.interacting.value ? 'paused' : 'running' }"
            @animationend="index === slider.active.value ? slider.next() : undefined"
          />
        </span>
      </div>

      <figcaption class="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 p-4 text-white sm:gap-4 sm:p-6">
        <div
          v-if="current"
          class="flex min-w-0 flex-col gap-0.5"
          :aria-live="slider.playing.value ? 'off' : 'polite'"
        >
          <p class="m-0 text-sm font-semibold text-pretty sm:text-base">
            {{ current.title }}
          </p>
          <p class="m-0 text-xs text-white/85 sm:text-sm">
            {{ current.subtitle }}
          </p>
          <p
            v-if="current.image.credit"
            class="m-0 text-[11px] text-white/75"
          >
            Photo : {{ current.image.credit }}
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-0.5 rounded-full bg-black/40 p-1 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Photo précédente"
            :class="controlClass"
            @click="slider.previous()"
          >
            <ChevronLeft
              class="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            :aria-label="slider.paused.value ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause'"
            :class="controlClass"
            @click="slider.togglePause()"
          >
            <Play
              v-if="slider.paused.value"
              class="size-3.5"
              aria-hidden="true"
            />
            <Pause
              v-else
              class="size-3.5"
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Photo suivante"
            :class="controlClass"
            @click="slider.next()"
          >
            <ChevronRight
              class="size-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </figcaption>
    </div>
  </figure>
</template>
