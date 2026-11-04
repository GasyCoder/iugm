<script setup lang="ts">
import { hero } from '~/data/home'
import { footerNavigation, legalLinks } from '~/data/navigation'
import { institution } from '~/data/institution'

const headingClass = 'm-0 text-sm font-semibold text-white'
</script>

<template>
  <footer
    id="contact"
    class="w-full bg-iugm-blue-950 text-sm text-iugm-blue-100 focus-on-dark"
  >
    <h2 class="sr-only">
      Contact et informations
    </h2>
    <div class="page-container pt-14 pb-8 lg:pt-16">
      <div class="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
        <div class="flex max-w-sm flex-col gap-5">
          <div class="flex items-center gap-3">
            <span class="grid size-12 shrink-0 place-items-center rounded-lg bg-white p-0.5">
              <IugmLogo
                :size="56"
                plain
                class="size-full"
              />
            </span>
            <span class="flex flex-col leading-tight">
              <span class="text-base font-bold text-white">{{ institution.acronym }}</span>
              <span class="text-xs">{{ institution.parent }}</span>
            </span>
          </div>
          <p class="m-0 leading-relaxed">
            {{ hero.tagline }}
          </p>
          <address class="leading-relaxed not-italic">
            <template
              v-for="(line, index) in institution.address"
              :key="line"
            >
              <br v-if="index > 0">{{ line }}
            </template>
          </address>
          <span class="text-xs font-medium text-iugm-green-300">{{ institution.values }}</span>
        </div>

        <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
          <nav
            v-for="group in footerNavigation"
            :key="group.title"
            :aria-label="group.title"
            class="flex flex-col gap-3.5"
          >
            <h3 :class="headingClass">
              {{ group.title }}
            </h3>
            <AppFooterLinks :links="group.links" />
          </nav>

          <div class="col-span-2 flex flex-col gap-8 sm:flex-row md:col-span-1 md:flex-col">
            <div class="flex flex-col gap-3.5">
              <h3 :class="headingClass">
                Contact {{ institution.mainCampus.name }}
              </h3>
              <AppFooterContacts group="main" />
            </div>
            <div class="flex flex-col gap-3.5">
              <h3 :class="headingClass">
                Sites régionaux
              </h3>
              <AppFooterContacts group="regional" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs md:flex-row md:justify-between">
        <span>© {{ institution.parent }} · {{ institution.acronym }} · Informations issues des brochures de l’IUGM</span>
        <ul class="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          <li
            v-for="link in legalLinks"
            :key="link.label"
          >
            {{ link.label }}
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
