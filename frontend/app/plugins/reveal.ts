import type { Directive } from 'vue'

/**
 * v-reveal — apparition au scroll (Fondations : 500 ms, translation 12 px, une seule fois).
 * Le contenu est rendu visible côté serveur ; l'effet n'est armé qu'après hydratation,
 * pour les éléments encore hors écran, et jamais avec prefers-reduced-motion.
 *
 *   v-reveal          translation + fondu
 *   v-reveal.fade     fondu seul
 *   v-reveal="120"    délai en ms (échelonnement d'une liste)
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const reveal: Directive<HTMLElement, number | undefined, 'fade'> = {
  getSSRProps: () => ({}),

  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    if (el.getBoundingClientRect().top < window.innerHeight) {
      return
    }

    if (binding.modifiers.fade) {
      el.dataset.revealMode = 'fade'
    }
    if (binding.value) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }
    el.dataset.reveal = 'pending'

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) {
        return
      }
      el.dataset.reveal = 'done'
      observer.disconnect()
      observers.delete(el)
    }, { rootMargin: '0px 0px -10% 0px' })

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
