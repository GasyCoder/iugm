<script setup lang="ts">
import { logo } from '~/data/media'

withDefaults(defineProps<{
  /** Taille d'affichage maximale en px (sert au calcul des variantes d'image). */
  size?: number
  /** Vide lorsque le logo accompagne le texte « IUGM » (décoratif). */
  alt?: string
  /** Sans pastille blanche (sur fond clair). */
  plain?: boolean
}>(), {
  size: 48,
  alt: '',
  plain: false,
})
</script>

<template>
  <NuxtImg
    :src="logo.src"
    :alt="alt"
    :width="size"
    :height="size"
    densities="x1 x2"
    format="webp"
    class="shrink-0"
    :class="plain ? undefined : 'rounded-full bg-white p-px'"
  />
</template>
