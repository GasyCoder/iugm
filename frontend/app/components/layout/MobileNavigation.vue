<script setup lang="ts">
import type { NavItem } from '~/types/navigation'
import { useMediaQuery } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from 'reka-ui'
import { applyLink, mobileNavigation } from '~/data/navigation'
import { contacts, institution } from '~/data/institution'

defineProps<{
  /** Style du bouton d'ouverture : sur fond clair (header opaque) ou sur photo. */
  solid: boolean
  activeSection: string | null
}>()

const open = ref(false)
const keyword = ref('')
const { searchEverywhere } = useProgramFilters()
const { goToSection, focusSection } = useSectionNavigation()
const mainPhone = contacts.mainPhones[0]

/**
 * Section choisie dans le menu. À la fermeture, le focus va vers cette destination ;
 * sans destination (Échap, bouton ✕), reka le rend au bouton d'ouverture.
 */
const destination = ref<string | null>(null)

function close() {
  open.value = false
}

function onNavigate(item: NavItem) {
  destination.value = item.sectionId ?? null
  close()
}

function onCloseAutoFocus(event: Event) {
  const id = destination.value
  destination.value = null
  if (!id) {
    return
  }
  event.preventDefault()
  focusSection(id)
}

// Recherche rapide : le mot-clé porte sur tous les niveaux et domaines.
async function onSearch() {
  searchEverywhere(keyword.value)
  destination.value = 'formations'
  close()
  await goToSection('formations')
}

// Le menu est réservé aux écrans < xl : le refermer si la fenêtre s'élargit.
const isDesktop = useMediaQuery('(min-width: 80rem)')
watch(isDesktop, (desktop) => {
  if (desktop) {
    close()
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <button
        type="button"
        class="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-full border bg-transparent transition-colors duration-200 xl:hidden"
        :class="solid ? 'border-border text-foreground' : 'border-white/45 text-white'"
        aria-label="Ouvrir le menu"
      >
        <span
          aria-hidden="true"
          class="block h-[1.5px] w-4.5 bg-current"
        />
        <span
          aria-hidden="true"
          class="block h-[1.5px] w-4.5 bg-current"
        />
      </button>
    </DialogTrigger>

    <DialogPortal>
      <!-- L'overlay porte aussi le verrouillage du scroll de la page (reka-ui). -->
      <DialogOverlay class="fixed inset-0 z-50 bg-iugm-blue-950 duration-240 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 xl:hidden" />
      <DialogContent
        class="fixed inset-0 z-50 flex flex-col bg-iugm-blue-900 text-white focus-on-dark duration-240 ease-out-soft outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-2 xl:hidden"
        @close-auto-focus="onCloseAutoFocus"
      >
        <DialogTitle class="sr-only">
          Menu
        </DialogTitle>
        <DialogDescription class="sr-only">
          Navigation principale et recherche de formation
        </DialogDescription>

        <div class="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span class="flex items-center gap-3">
            <IugmLogo
              :size="40"
              class="size-10"
            />
            <span class="text-lg font-extrabold">{{ institution.acronym }}</span>
          </span>
          <DialogClose
            class="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-transparent text-lg text-white"
            aria-label="Fermer le menu"
          >
            <span aria-hidden="true">✕</span>
          </DialogClose>
        </div>

        <form
          role="search"
          class="px-5 pt-4"
          @submit.prevent="onSearch"
        >
          <label
            for="mobile-program-search"
            class="sr-only"
          >Trouvez votre formation</label>
          <input
            id="mobile-program-search"
            v-model="keyword"
            type="search"
            enterkeyhint="search"
            placeholder="Trouvez votre formation…"
            class="h-12 w-full rounded-full border-0 bg-white/10 px-5 text-[15px] text-white placeholder:text-iugm-blue-100"
          >
        </form>

        <nav
          aria-label="Navigation principale"
          class="flex-1 overflow-y-auto px-5 py-2"
        >
          <AppNavLink
            v-for="item in mobileNavigation"
            :key="item.label"
            :to="item.to"
            :aria-current="activeSection === item.sectionId ? 'location' : undefined"
            class="flex h-14 items-center justify-between border-b border-white/10 text-lg font-semibold text-white no-underline hover:text-iugm-green-300 aria-[current=location]:text-iugm-green-300"
            @navigate="onNavigate(item)"
          >
            {{ item.label }}<span
              aria-hidden="true"
              class="text-iugm-green-300"
            >→</span>
          </AppNavLink>
        </nav>

        <div class="flex shrink-0 flex-col gap-3 border-t border-white/10 px-5 pt-4 pb-7">
          <Button
            as-child
            variant="light"
          >
            <AppNavLink
              :to="applyLink.to"
              @navigate="onNavigate(applyLink)"
            >
              Candidater à l’IUGM
            </AppNavLink>
          </Button>
          <p
            v-if="mainPhone"
            class="m-0 text-center text-sm text-iugm-blue-100"
          >
            <IugmContactLink
              :point="mainPhone"
              tone="dark"
              class="text-iugm-blue-100 no-underline hover:text-white"
            />
            · {{ institution.mainCampus.name }}
          </p>
        </div>
      </DialogContent>
    </DialogPortal>
  </Dialog>
</template>
