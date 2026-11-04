<script setup lang="ts">
import type { Component } from 'vue'
import { FileCheck, GraduationCap, House, Menu, Phone } from '@lucide/vue'
import type { NavItem } from '~/types/navigation'

/** Barre d'onglets mobile : accès direct aux rubriques qu'un futur étudiant cherche d'abord. */
const route = useRoute()
const menuOpen = useMobileMenu()

const tabs: (NavItem & { icon: Component })[] = [
  { label: 'Accueil', to: '/', icon: House },
  { label: 'Formations', to: '/formations', icon: GraduationCap },
  { label: 'Admissions', to: '/admissions', icon: FileCheck },
  { label: 'Contact', to: { hash: '#contact' }, icon: Phone },
]

function currentOf(tab: NavItem) {
  if (tab.to === '/') {
    return route.path === '/' ? 'page' : undefined
  }
  return navItemCurrent(tab, route.path, null)
}

const tabClass = 'relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 text-[11px] font-medium no-underline transition-colors -outline-offset-2'
</script>

<template>
  <nav
    aria-label="Accès rapide"
    class="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
  >
    <ul class="mx-auto m-0 grid h-16 max-w-lg list-none grid-cols-5 p-0">
      <li
        v-for="tab in tabs"
        :key="tab.label"
      >
        <AppNavLink
          :to="tab.to"
          :aria-current="currentOf(tab)"
          :class="[tabClass, currentOf(tab) ? 'text-primary hover:text-primary' : 'text-foreground-muted hover:text-foreground']"
        >
          <span
            v-if="currentOf(tab)"
            aria-hidden="true"
            class="absolute top-0 h-0.5 w-8 rounded-full bg-primary"
          />
          <component
            :is="tab.icon"
            class="size-5"
            aria-hidden="true"
          />
          {{ tab.label }}
        </AppNavLink>
      </li>
      <li>
        <button
          type="button"
          aria-haspopup="dialog"
          :aria-expanded="menuOpen"
          :class="[tabClass, menuOpen ? 'text-primary' : 'text-foreground-muted hover:text-foreground']"
          @click="menuOpen = true"
        >
          <Menu
            class="size-5"
            aria-hidden="true"
          />
          Menu
        </button>
      </li>
    </ul>
  </nav>
</template>
