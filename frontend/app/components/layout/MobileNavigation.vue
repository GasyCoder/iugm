<script setup lang="ts">
import type { Component } from 'vue'
import type { NavItem } from '~/types/navigation'
import { useMediaQuery } from '@vueuse/core'
import { FileCheck, GraduationCap, Handshake, Info, Mail, Menu, Users, X } from '@lucide/vue'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from 'reka-ui'
import { applyLink, mobileNavigation } from '~/data/navigation'
import { contacts, institution } from '~/data/institution'

defineProps<{
  activeSection: string | null
}>()

const open = useMobileMenu()
const keyword = ref<string | number>('')
const route = useRoute()
const { focusSection } = useSectionNavigation()
const mainPhone = contacts.mainPhones[0]

const icons: Record<string, Component> = {
  'L’Institut': Info,
  'Formations': GraduationCap,
  'Admissions': FileCheck,
  'Vie étudiante': Users,
  'Entreprises': Handshake,
  'Contact': Mail,
}

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

// Recherche rapide : le catalogue s'ouvre avec le mot-clé, tous niveaux et domaines confondus.
async function onSearch() {
  const q = String(keyword.value).trim()
  close()
  await navigateTo({ path: '/formations', query: q ? { q } : {} })
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
      <Button
        variant="ghost"
        size="icon"
        class="xl:hidden"
        aria-label="Ouvrir le menu"
      >
        <Menu
          class="size-5"
          aria-hidden="true"
        />
      </Button>
    </DialogTrigger>

    <DialogPortal>
      <!-- L'overlay porte aussi le verrouillage du scroll de la page (reka-ui). -->
      <DialogOverlay class="fixed inset-0 z-60 bg-black/50 duration-240 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 xl:hidden" />
      <DialogContent
        class="fixed inset-y-0 right-0 z-60 flex w-[88%] max-w-sm flex-col bg-background shadow-lg duration-240 ease-out-soft outline-none data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right xl:hidden"
        @close-auto-focus="onCloseAutoFocus"
      >
        <DialogTitle class="sr-only">
          Menu
        </DialogTitle>
        <DialogDescription class="sr-only">
          Navigation principale et recherche de formation
        </DialogDescription>

        <div class="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <span class="flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-lg bg-white p-0.5 ring-1 ring-border">
              <!-- Taille du header : le menu n'étant pas pré-rendu, seule une variante déjà générée existe en statique. -->
              <IugmLogo
                :size="48"
                plain
                class="size-full"
              />
            </span>
            <span class="flex flex-col leading-tight">
              <span class="text-[15px] font-bold tracking-tight">{{ institution.acronym }}</span>
              <span class="text-xs text-foreground-muted">{{ institution.parent }}</span>
            </span>
          </span>
          <DialogClose as-child>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fermer le menu"
            >
              <X
                class="size-5"
                aria-hidden="true"
              />
            </Button>
          </DialogClose>
        </div>

        <form
          role="search"
          class="px-4 pt-4"
          @submit.prevent="onSearch"
        >
          <Label
            for="mobile-program-search"
            class="sr-only"
          >
            Trouvez votre formation
          </Label>
          <Input
            id="mobile-program-search"
            v-model="keyword"
            type="search"
            enterkeyhint="search"
            placeholder="Trouvez votre formation…"
          />
        </form>

        <nav
          aria-label="Navigation principale"
          class="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3"
        >
          <AppNavLink
            v-for="item in mobileNavigation"
            :key="item.label"
            :to="item.to"
            :aria-current="navItemCurrent(item, route.path, activeSection)"
            class="flex min-h-12 items-center gap-3 rounded-lg px-3 text-base font-medium text-foreground no-underline hover:bg-accent hover:text-foreground aria-[current]:bg-accent aria-[current]:text-primary"
            @navigate="onNavigate(item)"
          >
            <component
              :is="icons[item.label]"
              class="size-5 text-foreground-muted"
              aria-hidden="true"
            />
            {{ item.label }}
          </AppNavLink>
        </nav>

        <div class="flex shrink-0 flex-col gap-3 border-t px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            as-child
            size="lg"
          >
            <AppNavLink
              :to="applyLink.to"
              @navigate="onNavigate(applyLink)"
            >
              {{ applyLink.label }}
            </AppNavLink>
          </Button>
          <p
            v-if="mainPhone"
            class="m-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-foreground-muted"
          >
            <IugmContactLink :point="mainPhone" />
            · {{ institution.mainCampus.name }}
          </p>
        </div>
      </DialogContent>
    </DialogPortal>
  </Dialog>
</template>
