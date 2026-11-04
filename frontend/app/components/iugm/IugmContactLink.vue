<script setup lang="ts">
import type { ContactPoint } from '~/types/institution'

/**
 * Moyen de contact : lien tel:/mailto: si la donnée est vérifiée,
 * texte non actionnable (et mention « À CONFIRMER ») sinon. Voir utils/contact.ts.
 */
const props = withDefaults(defineProps<{
  point: ContactPoint
  /** Libellé d'action à la place de la valeur (ex. « Appeler ») : uniquement si le lien est actif. */
  label?: string
  tone?: 'light' | 'dark'
  /** Afficher la mention à côté du texte (désactivé quand une mention commune existe). */
  showPending?: boolean
  /** Classes ajoutées lorsque la donnée n'est pas vérifiée. */
  pendingClass?: string
}>(), {
  tone: 'light',
  showPending: true,
})

const href = computed(() => contactHref(props.point))
const text = computed(() => (href.value ? props.label ?? props.point.display : props.point.display))
</script>

<template>
  <a
    v-if="href"
    :href="href"
  >{{ text }}</a>
  <span
    v-else
    :class="pendingClass"
  >
    {{ text }}
    <IugmPendingTag
      v-if="showPending"
      :tone="tone"
      class="ml-1.5"
    />
  </span>
</template>
