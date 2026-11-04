<script setup lang="ts">
/** En-tête des pages internes : même fond et mêmes cercles que le bandeau final de l'accueil. */
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  /** `compact` pour les intitulés longs (fiches formation). */
  size?: 'default' | 'compact'
}>(), {
  size: 'default',
})
</script>

<template>
  <section class="relative isolate w-full overflow-hidden bg-iugm-blue-900 text-white focus-on-dark">
    <IugmConcentricCircles />
    <div class="flex w-full flex-col gap-4 px-gutter py-10 md:py-16">
      <slot name="before" />
      <IugmEyebrow
        v-if="eyebrow"
        tone="dark"
      >
        {{ eyebrow }}
      </IugmEyebrow>
      <h1
        class="m-0 max-w-4xl font-semibold text-balance break-words"
        :class="size === 'compact' ? 'text-h2' : 'text-h1'"
      >
        {{ title }}
      </h1>
      <slot />
    </div>
  </section>
</template>
