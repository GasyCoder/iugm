<script setup lang="ts">
import { media } from '~/data/media'
import { institution } from '~/data/institution'

const sites = [institution.mainCampus, ...institution.regionalCampuses].map(campus => campus.name)
</script>

<template>
  <section
    id="vie-iugm"
    aria-labelledby="vie-title"
    class="w-full bg-background"
  >
    <div class="flex w-full flex-col gap-8 border-t border-border px-gutter py-16 md:py-24">
      <IugmSectionHeading
        id="vie-title"
        eyebrow="Vie à l’IUGM"
        :title="`${sites.join(', ')}.`"
      />

      <div
        v-reveal.fade
        class="grid auto-rows-[9.375rem] grid-cols-2 gap-2 md:auto-rows-[15rem] md:grid-cols-4 md:gap-3"
      >
        <IugmImagePlaceholder
          :subject="media.promotion.alt"
          class="col-span-2 size-full rounded md:row-span-2"
        />
        <IugmImagePlaceholder
          :subject="media.teamStand.alt"
          class="size-full rounded"
        />
        <IugmImagePlaceholder
          subject="vie associative"
          class="rounded"
        />
        <IugmImagePlaceholder
          subject="campus de Mahajanga"
          class="hidden rounded md:block"
        />
        <div class="flex flex-col justify-between rounded bg-primary-strong p-4 text-white md:p-6">
          <span class="font-mono text-[11px] tracking-widest text-iugm-green-300">{{ sites.length }} SITES</span>
          <ul class="m-0 flex list-none flex-col gap-1 p-0 text-sm font-bold md:text-lg">
            <li
              v-for="site in sites"
              :key="site"
            >
              {{ site }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
