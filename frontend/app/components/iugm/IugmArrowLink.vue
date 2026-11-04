<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ButtonVariants } from '~/components/ui/button'
import { ArrowRight } from '@lucide/vue'
import { buttonVariants } from '~/components/ui/button'

/** Lien d'action avec flèche. */
withDefaults(defineProps<{
  to: RouteLocationRaw
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}>(), {
  variant: 'default',
  size: 'lg',
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group"
    :class="buttonVariants({ variant, size })"
  >
    <slot />
    <ArrowRight
      class="transition-transform duration-150 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
