<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'span' | 'p'
  tone?: 'light' | 'dark'
}>(), {
  as: 'span',
  tone: 'light',
})
</script>

<template>
  <component
    :is="as"
    class="m-0 text-sm font-medium"
    :class="tone === 'dark' ? 'text-iugm-green-300' : 'text-accent-text'"
  >
    <slot />
  </component>
</template>
