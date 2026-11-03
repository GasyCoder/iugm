<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'span' | 'p' | 'h2'
  tone?: 'light' | 'dark'
}>(), {
  as: 'span',
  tone: 'light',
})
</script>

<template>
  <component
    :is="as"
    class="m-0 font-mono text-xs font-normal tracking-[0.12em] uppercase"
    :class="tone === 'dark' ? 'text-iugm-green-300' : 'text-accent-text'"
  >
    <slot />
  </component>
</template>
