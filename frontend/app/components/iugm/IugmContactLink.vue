<script setup lang="ts">
import type { ContactPoint } from '~/types/institution'

/** Moyen de contact : lien tel:/mailto: si l'IUGM l'a vérifié, simple texte sinon. Voir utils/contact.ts. */
const props = defineProps<{
  point: ContactPoint
}>()

const href = computed(() => contactHref(props.point))
</script>

<template>
  <a
    v-if="href"
    :href="href"
  >{{ point.display }}</a>
  <span v-else>{{ point.display }}</span>
</template>
