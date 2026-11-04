<script setup lang="ts">
/** Section de page : conteneur commun, fond blanc ou gris alterné, rythme vertical 64 → 80 px. */
withDefaults(defineProps<{
  id?: string
  /** Identifiant du titre de section (aria-labelledby). */
  labelledby?: string
  tone?: 'background' | 'muted'
  spacing?: 'both' | 'top' | 'bottom'
  /** Filet supérieur séparant deux sections de même fond. */
  bordered?: boolean
  /** Mise en page du contenu (grid, flex, gap…). */
  contentClass?: string
}>(), {
  tone: 'background',
  spacing: 'both',
  bordered: true,
})

const spacings = {
  both: 'py-16 lg:py-20',
  top: 'pt-16 lg:pt-20',
  bottom: 'pb-16 lg:pb-20',
} as const
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="labelledby"
    class="w-full"
    :class="[tone === 'muted' ? 'bg-surface-muted' : 'bg-background', bordered ? 'border-t' : undefined]"
  >
    <div
      class="page-container"
      :class="[spacings[spacing], contentClass]"
    >
      <slot />
    </div>
  </section>
</template>
