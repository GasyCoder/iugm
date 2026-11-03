<script setup lang="ts">
/**
 * Section de page : fond, gouttière et rythme vertical du prototype v2
 * (py-16 → md:py-24, gouttière 20 / 40 / 64 px).
 */
withDefaults(defineProps<{
  id?: string
  /** Identifiant du titre de section (aria-labelledby). */
  labelledby?: string
  tone?: 'background' | 'surface' | 'muted' | 'night' | 'primary'
  spacing?: 'both' | 'top' | 'bottom'
  /** Mise en page du contenu (grid, flex, gap…). */
  contentClass?: string
}>(), {
  tone: 'background',
  spacing: 'both',
})

const tones = {
  background: 'bg-background',
  surface: 'bg-surface',
  muted: 'bg-surface-muted',
  night: 'bg-iugm-blue-950 text-white focus-on-dark',
  primary: 'bg-primary text-white focus-on-dark',
} as const

const spacings = {
  both: 'py-16 md:py-24',
  top: 'pt-16 md:pt-24',
  bottom: 'pb-16 md:pb-24',
} as const
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="labelledby"
    class="w-full"
    :class="tones[tone]"
  >
    <div
      class="w-full px-gutter"
      :class="[spacings[spacing], contentClass]"
    >
      <slot />
    </div>
  </section>
</template>
