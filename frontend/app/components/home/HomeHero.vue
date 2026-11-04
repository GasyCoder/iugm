<script setup lang="ts">
import { hero } from '~/data/home'
import { institution } from '~/data/institution'
import { heroSlides, heroThumbnailWidth } from '~/data/media'

const slider = useHeroSlider(heroSlides.length)
</script>

<template>
  <section
    aria-labelledby="hero-title"
    class="relative overflow-hidden bg-background"
  >
    <div class="page-container grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-16 lg:pt-16 lg:pb-14">
      <div class="order-2 lg:order-1">
        <p class="m-0 text-sm font-medium text-accent-text">
          {{ institution.acronym }} · {{ institution.parent }}
        </p>
        <h1
          id="hero-title"
          class="mt-3 mb-0 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {{ hero.title }}
          <span class="text-primary">{{ hero.titleHighlight }}</span>
        </h1>
        <p class="mt-5 mb-0 max-w-xl leading-relaxed text-pretty text-foreground-muted">
          {{ institution.name }}. {{ hero.tagline }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            as-child
            size="lg"
          >
            <NuxtLink to="/formations">
              Découvrir nos formations
            </NuxtLink>
          </Button>
          <IugmArrowLink
            to="/admissions"
            variant="outline"
          >
            Rejoindre l’IUGM
          </IugmArrowLink>
        </div>

        <!-- Vignettes : navigation directe dans le diaporama. -->
        <div class="mt-10 hidden items-center gap-3 lg:flex">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.key"
            type="button"
            :aria-label="`Afficher la photo : ${slide.title}`"
            :aria-current="index === slider.active.value ? 'true' : undefined"
            class="relative size-14 cursor-pointer overflow-hidden rounded-lg ring-offset-2 ring-offset-background transition duration-300"
            :class="index === slider.active.value ? 'ring-2 ring-primary' : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'"
            @click="slider.go(index)"
          >
            <img
              :src="`${slide.base}-${heroThumbnailWidth}.webp`"
              alt=""
              width="56"
              height="56"
              loading="lazy"
              decoding="async"
              class="size-full object-cover"
              :style="{ objectPosition: slide.position }"
            >
          </button>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <HomeHeroSlider :slider="slider" />
      </div>
    </div>

    <div class="page-container pb-12 lg:pb-16">
      <slot name="search" />
    </div>
  </section>
</template>
