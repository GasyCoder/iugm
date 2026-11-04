<script setup lang="ts">
import { useMounted, useWindowScroll } from '@vueuse/core'
import { ArrowUp } from '@lucide/vue'

const isMounted = useMounted()
const { y } = useWindowScroll()
const visible = computed(() => isMounted.value && y.value > 640)

/** Le défilement suit le CSS (doux, sauf si l'utilisateur réduit les animations) ; le focus clavier remonte aussi. */
function scrollToTop() {
  window.scrollTo({ top: 0 })
  document.getElementById('contenu')?.focus({ preventScroll: true })
}
</script>

<template>
  <!-- `invisible` retire aussi le bouton de la navigation au clavier quand il est masqué. -->
  <Button
    variant="outline"
    size="icon"
    aria-label="Revenir en haut de la page"
    title="Revenir en haut de la page"
    class="fixed right-4 bottom-[calc(var(--tabbar-height)+1rem)] z-40 rounded-full shadow-md sm:right-6 lg:bottom-6"
    :class="visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'"
    @click="scrollToTop"
  >
    <ArrowUp aria-hidden="true" />
  </Button>
</template>
