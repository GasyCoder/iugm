<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/** CTA principal du prototype : pilule blanche, pastille verte avec flèche. */
defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex h-13 items-center justify-between gap-4 rounded-full bg-white pr-2 pl-6 text-base font-semibold text-primary no-underline transition duration-150 ease-out-soft hover:bg-iugm-blue-50 hover:text-primary sm:justify-start"
  >
    <slot />
    <span
      aria-hidden="true"
      class="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition duration-150 ease-out-soft group-hover:translate-x-0.5"
    >→</span>
  </NuxtLink>
</template>
