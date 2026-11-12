<script setup lang="ts">
import { ArrowRight, Megaphone } from '@lucide/vue'

/** Bandeau Flash info : l'annonce en cours la plus récente, en tête de chaque page. */
const { active } = useAnnouncements()
const latest = computed(() => active.value[0])
const others = computed(() => active.value.length - 1)
</script>

<template>
  <aside
    v-if="latest"
    aria-label="Flash info"
    class="border-b border-iugm-green-200 bg-iugm-green-50 text-iugm-green-950"
  >
    <div class="page-container flex min-h-11 items-center gap-3 py-2 text-sm">
      <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-iugm-green-700 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        <Megaphone
          class="size-3.5"
          aria-hidden="true"
        />
        Flash info
      </span>
      <NuxtLink
        :to="`/annonces/${latest.slug}`"
        class="group flex min-w-0 flex-1 items-center gap-2 font-medium text-iugm-green-950 no-underline hover:text-iugm-green-950"
      >
        <span class="line-clamp-2 min-w-0 group-hover:underline sm:line-clamp-1">{{ latest.flash }}</span>
        <ArrowRight
          class="size-4 shrink-0 text-iugm-green-700 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </NuxtLink>
      <NuxtLink
        v-if="others > 0"
        to="/annonces"
        class="shrink-0 text-xs font-medium text-iugm-green-800 max-sm:hidden"
      >
        + {{ others }} autre{{ others > 1 ? 's' : '' }}
      </NuxtLink>
    </div>
  </aside>
</template>
