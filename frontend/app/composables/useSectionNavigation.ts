/**
 * Navigation vers une section de l'accueil.
 * - goToSection : si l'URL porte déjà ce hash, le routeur ignorerait la navigation ;
 *   on défile alors directement.
 * - focusSection : place le focus clavier sur le titre de la section (sans défilement),
 *   pour que la tabulation reprenne depuis la destination.
 */
export function useSectionNavigation() {
  const route = useRoute()
  const router = useRouter()

  async function goToSection(id: string) {
    const hash = `#${id}`
    if (route.path === '/' && route.hash === hash) {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
      return
    }
    await router.push({ path: '/', hash })
  }

  function focusSection(id: string) {
    const section = document.getElementById(id)
    if (!section) {
      return
    }
    const labelId = section.getAttribute('aria-labelledby')
    const target = (labelId ? document.getElementById(labelId) : null) ?? section.querySelector<HTMLElement>('h2') ?? section
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1')
    }
    target.focus({ preventScroll: true })
  }

  return { goToSection, focusSection }
}
