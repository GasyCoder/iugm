import { useEventListener } from '@vueuse/core'

/**
 * Section de la page d'accueil en cours de lecture (lien de navigation actif) :
 * la dernière section dont le haut a franchi le milieu de l'écran ; en bas de page,
 * la dernière section visible (le footer n'atteint jamais le milieu de l'écran).
 * Ne s'active que sur « / » ; les sections absentes sont ignorées.
 */
export function useActiveSection(sectionIds: MaybeRefOrGetter<string[]>) {
  const route = useRoute()
  const activeId = ref<string | null>(null)
  let frame = 0

  function compute(): string | null {
    if (route.path !== '/') {
      return null
    }
    const sections = toValue(sectionIds)
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
      .map(element => ({ id: element.id, rect: element.getBoundingClientRect() }))
      .sort((a, b) => a.rect.top - b.rect.top)

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    const threshold = atBottom ? window.innerHeight : window.innerHeight / 2
    const current = sections.filter(section => section.rect.top <= threshold && section.rect.bottom > 0).at(-1)
    return current?.id ?? null
  }

  function update() {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      activeId.value = compute()
    })
  }

  onMounted(update)
  useEventListener('scroll', update, { passive: true })
  useEventListener('resize', update, { passive: true })
  watch(() => route.fullPath, () => nextTick(update))
  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return readonly(activeId)
}
