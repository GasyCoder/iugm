<script setup lang="ts">
/**
 * Emplacement photo rayé (Fondations : « Aucune photo IA d'étudiants.
 * Placeholders rayés et légendés jusqu'à réception des vraies images »).
 * La pastille annonce clairement une photo à venir, sans ressembler à une légende finale.
 */
withDefaults(defineProps<{
  /** Sujet de la photo attendue, ex. « étudiants en atelier projet ». */
  subject: string
  tone?: 'light' | 'dark'
  captionPosition?: 'top' | 'bottom'
  /** Version réduite (vignettes, avatars) : sans pastille. */
  bare?: boolean
}>(), {
  tone: 'light',
  captionPosition: 'bottom',
  bare: false,
})
</script>

<template>
  <div
    role="img"
    :aria-label="`Photo à venir : ${subject}`"
    class="relative overflow-hidden"
    :class="tone === 'dark'
      ? 'bg-iugm-blue-900 bg-[repeating-linear-gradient(135deg,oklch(0.3_0.08_268)_0_1px,transparent_1px_12px)]'
      : 'bg-iugm-blue-50 bg-[repeating-linear-gradient(135deg,oklch(0.86_0.02_266)_0_1px,transparent_1px_11px)]'"
  >
    <span
      v-if="!bare"
      aria-hidden="true"
      class="absolute left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-sm bg-sand-50 px-2 py-1 font-mono text-[11px] leading-tight text-foreground-muted"
      :class="captionPosition === 'top' ? 'top-3' : 'bottom-3'"
    >
      <span class="shrink-0 font-medium tracking-wide text-warning uppercase">Photo à venir</span>
      <span class="truncate">· {{ subject }}</span>
    </span>
  </div>
</template>
