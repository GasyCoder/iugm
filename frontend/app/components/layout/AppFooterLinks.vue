<script setup lang="ts">
import type { FooterLink } from '~/types/navigation'

defineProps<{
  links: FooterLink[]
}>()
</script>

<template>
  <ul class="m-0 flex list-none flex-col gap-2.5 p-0 text-sm">
    <li
      v-for="link in links"
      :key="link.label"
    >
      <AppNavLink
        v-if="link.to"
        :to="link.to"
        class="break-words text-iugm-blue-100 no-underline hover:text-white"
      >
        {{ link.label }}
      </AppNavLink>
      <a
        v-else-if="link.href"
        :href="link.href"
        class="break-words text-iugm-blue-100 no-underline hover:text-white"
      >{{ link.label }}</a>
      <!-- Page non encore publiée : affichée sans lien. -->
      <span
        v-else
        class="text-iugm-blue-300"
      >{{ link.label }}</span>
    </li>
  </ul>
</template>
