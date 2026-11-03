<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/**
 * Lien interne de navigation. Un second clic sur une ancre déjà active
 * (même route, même hash) fait de nouveau défiler jusqu'à la section,
 * ce que le routeur ignore par défaut. Les clics avec modificateur
 * (nouvel onglet, etc.) ne sont jamais interceptés.
 */
const props = defineProps<{
  to: RouteLocationRaw
}>()

const emit = defineEmits<{
  navigate: []
}>()

const route = useRoute()
const router = useRouter()

function onClick(event: MouseEvent) {
  if (!isPlainPrimaryClick(event)) {
    return
  }
  emit('navigate')
  const target = router.resolve(props.to)
  if (!target.hash || target.path !== route.path || target.hash !== route.hash) {
    return
  }
  const section = document.getElementById(decodeURIComponent(target.hash.slice(1)))
  if (section) {
    event.preventDefault()
    section.scrollIntoView({ block: 'start' })
  }
}
</script>

<template>
  <NuxtLink
    :to="to"
    @click="onClick"
  >
    <slot />
  </NuxtLink>
</template>
