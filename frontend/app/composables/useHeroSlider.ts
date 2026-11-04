/**
 * Diaporama du Hero. La progression CSS pilote le changement de photo (`next` à la fin de l'animation) :
 * elle se met en pause et reprend exactement là où elle en était.
 * Seule la première photo est dans le HTML ; la suivante n'est chargée qu'après quelques secondes,
 * pour ne pas concurrencer le premier affichage sur une connexion lente.
 * Sans défilement automatique si l'utilisateur préfère réduire les animations.
 */
export function useHeroSlider(count: number) {
  const active = ref(0)
  const started = ref(false)
  const paused = ref(false)
  const interacting = ref(false)
  const rendered = ref(new Set([0]))

  const playing = computed(() => started.value && !paused.value)

  function prepare(index: number) {
    rendered.value = new Set([...rendered.value, index, (index + 1) % count])
  }

  function go(index: number) {
    const target = (index + count) % count
    active.value = target
    prepare(target)
  }

  let preloadTimer: ReturnType<typeof setTimeout> | undefined

  onMounted(() => {
    paused.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    started.value = true
    preloadTimer = setTimeout(() => prepare(active.value), 3000)
  })

  onBeforeUnmount(() => clearTimeout(preloadTimer))

  return {
    active: readonly(active),
    rendered: readonly(rendered),
    playing,
    paused: readonly(paused),
    interacting: readonly(interacting),
    setInteracting: (value: boolean) => {
      interacting.value = value
    },
    go,
    next: () => go(active.value + 1),
    previous: () => go(active.value - 1),
    togglePause: () => {
      paused.value = !paused.value
    },
  }
}

export type HeroSlider = ReturnType<typeof useHeroSlider>
