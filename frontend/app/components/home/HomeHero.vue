<script setup lang="ts">
import { hero } from '~/data/home'
import { institution } from '~/data/institution'

const nameWords = institution.name.split(' ')
const highlighted = new Set(['Institut', 'Universitaire', 'Gestion', 'Management'])
</script>

<template>
  <div class="relative isolate">
    <section
      aria-labelledby="hero-title"
      class="relative isolate h-svh max-h-240 min-h-160 w-full overflow-hidden bg-iugm-blue-900 text-white focus-on-dark"
    >
      <IugmConcentricCircles />
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-10 bg-linear-to-b from-iugm-blue-950/90 via-iugm-blue-950/75 via-60% to-iugm-blue-950/30"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-10 bg-linear-to-r from-iugm-blue-950/60 via-iugm-blue-950/25 to-transparent"
      />

      <div class="flex h-full w-full flex-col justify-center px-gutter pt-16 pb-12 lg:pb-52 xl:pb-36">
        <div class="flex max-w-3xl flex-col gap-5 lg:max-w-4xl">
          <div class="flex items-center gap-3 text-xs font-semibold tracking-[0.16em]">
            <IugmColonnadeBars />
            {{ institution.parent.toUpperCase() }}
          </div>
          <p class="m-0 text-base font-medium text-iugm-blue-100 md:text-lg">
            <strong class="font-extrabold text-white">{{ institution.acronym }}</strong> —
            <template
              v-for="(word, index) in nameWords"
              :key="`${word}-${index}`"
            >
              <template v-if="highlighted.has(word)">
                <span class="font-bold text-iugm-green-300">{{ word.charAt(0) }}</span>{{ word.slice(1) }}
              </template>
              <template v-else>
                {{ word }}
              </template>
              {{ ' ' }}
            </template>
          </p>
          <h1
            id="hero-title"
            class="m-0 text-h1 font-semibold text-balance"
          >
            {{ hero.title }}
          </h1>
          <p class="m-0 font-serif text-lg text-iugm-blue-50 italic md:text-xl">
            {{ hero.tagline }}
          </p>
          <div class="mt-2 flex flex-col gap-3 sm:flex-row">
            <IugmArrowLink to="/formations">
              Découvrir nos formations
            </IugmArrowLink>
            <Button
              as-child
              variant="outlineLight"
            >
              <AppNavLink to="/admissions">
                Rejoindre l’IUGM
              </AppNavLink>
            </Button>
          </div>
        </div>
      </div>

      <span class="absolute right-5 bottom-14 hidden font-mono text-[11px] tracking-widest text-iugm-blue-100 md:right-10 md:block lg:bottom-56 xl:right-16 xl:bottom-40">
        MAHAJANGA · MADAGASCAR
      </span>
    </section>

    <!-- Recherche : carte qui chevauche le Hero (mobile) / panneau posé sur son bord inférieur (desktop). -->
    <div class="relative z-10 -mt-9 bg-[linear-gradient(to_bottom,transparent_2.25rem,var(--color-surface)_2.25rem)] px-4 sm:px-6 md:px-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:bg-none xl:px-16">
      <slot name="search" />
    </div>
  </div>
</template>
