<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  tone?: 'light' | 'dark'
}>(), {
  label: 'À CONFIRMER PAR L’IUGM',
  tone: 'light',
})
</script>

<template>
  <span
    class="font-mono text-[11px] tracking-wide"
    :class="tone === 'dark' ? 'text-pending-on-dark' : 'text-warning'"
  >{{ label }}</span>
</template>
