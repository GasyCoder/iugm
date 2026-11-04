<script setup lang="ts">
import { Image } from '@lucide/vue'

/**
 * Emplacement photo : fond teinté et mention « Photo à venir », jusqu'à réception
 * de vraies images dont les droits sont confirmés. Aucune photo IA d'étudiants.
 */
withDefaults(defineProps<{
  /** Sujet de la photo attendue, ex. « étudiants en atelier projet ». */
  subject: string
  /** Version réduite (vignettes, avatars) : icône seule. */
  bare?: boolean
}>(), {
  bare: false,
})
</script>

<template>
  <div
    role="img"
    :aria-label="`Photo à venir : ${subject}`"
    class="flex flex-col items-center justify-center gap-1.5 bg-accent p-3 text-center text-primary"
  >
    <Image
      class="size-5"
      aria-hidden="true"
    />
    <span
      v-if="!bare"
      aria-hidden="true"
      class="text-xs font-medium text-foreground-muted"
    >Photo à venir</span>
  </div>
</template>
