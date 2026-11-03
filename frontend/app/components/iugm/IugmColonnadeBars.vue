<script setup lang="ts">
/** Barres verticales : la colonnade sous le baobab du logo (grammaire graphique Fondations). */
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 6,
})
</script>

<template>
  <span
    aria-hidden="true"
    class="flex gap-0.75"
  >
    <i
      v-for="n in count"
      :key="n"
      class="block h-3 w-0.5 bg-iugm-green-300"
    />
  </span>
</template>
