<script setup lang="ts">
withDefaults(defineProps<{
  /** Identifiant du titre, référencé par aria-labelledby sur la section. */
  id: string
  eyebrow: string
  title: string
  tone?: 'light' | 'dark'
}>(), {
  tone: 'light',
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <IugmEyebrow :tone="tone">
      {{ eyebrow }}
    </IugmEyebrow>
    <h2
      :id="id"
      class="m-0 text-h2 font-bold text-balance"
      :class="tone === 'dark' ? 'text-white' : 'text-primary-strong'"
    >
      {{ title }}
    </h2>
  </div>
</template>
