<script setup lang="ts">
defineProps<{
  /** Identifiant du titre, référencé par aria-labelledby sur la section. */
  id: string
  eyebrow?: string
  title: string
  /** Fin du titre, mise en valeur en couleur. */
  highlight?: string
  description?: string
}>()
</script>

<template>
  <div class="flex max-w-2xl flex-col gap-3">
    <div class="flex flex-col gap-1">
      <IugmEyebrow v-if="eyebrow">
        {{ eyebrow }}
      </IugmEyebrow>
      <h2
        :id="id"
        class="m-0 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        {{ title }}
        <span
          v-if="highlight"
          class="text-primary"
        >{{ highlight }}</span>
      </h2>
    </div>
    <p
      v-if="description"
      class="m-0 leading-relaxed text-pretty text-foreground-muted"
    >
      {{ description }}
    </p>
  </div>
</template>
