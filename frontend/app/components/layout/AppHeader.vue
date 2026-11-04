<script setup lang="ts">
import { applyLink, mainNavigation, mobileNavigation } from '~/data/navigation'
import { institution } from '~/data/institution'

// « formations » et « admissions » n'ont plus d'entrée de menu dédiée à leur section, mais délimitent les sections voisines.
const sectionIds = [...new Set(['formations', 'admissions', ...mobileNavigation.flatMap(item => (item.sectionId ? [item.sectionId] : []))])]
const activeSection = useActiveSection(sectionIds)
const route = useRoute()
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
    <div
      aria-hidden="true"
      class="h-1 bg-primary"
    />
    <div class="page-container flex h-16 items-center gap-6">
      <NuxtLink
        to="/"
        class="flex min-w-0 shrink-0 items-center gap-3 rounded-md no-underline"
        :aria-label="`${institution.acronym} — Accueil`"
      >
        <span class="grid size-11 shrink-0 place-items-center rounded-lg bg-white p-0.5 ring-1 ring-border">
          <IugmLogo
            :size="48"
            plain
            class="size-full"
          />
        </span>
        <span class="flex min-w-0 flex-col leading-tight">
          <span class="text-[15px] font-bold tracking-tight text-foreground">{{ institution.acronym }}</span>
          <span class="truncate text-xs text-foreground-muted max-[25rem]:hidden">{{ institution.parent }}</span>
        </span>
      </NuxtLink>

      <nav
        aria-label="Navigation principale"
        class="ml-auto hidden items-center gap-0.5 xl:flex"
      >
        <AppNavLink
          v-for="item in mainNavigation"
          :key="item.label"
          :to="item.to"
          :aria-current="navItemCurrent(item, route.path, activeSection)"
          class="relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-foreground-muted no-underline transition-colors duration-150 hover:bg-accent hover:text-foreground aria-[current]:text-foreground aria-[current]:hover:bg-transparent aria-[current]:after:absolute aria-[current]:after:inset-x-3 aria-[current]:after:-bottom-3.5 aria-[current]:after:h-0.5 aria-[current]:after:rounded-full aria-[current]:after:bg-primary"
        >
          {{ item.label }}
        </AppNavLink>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
        <Button
          as-child
          size="sm"
          class="max-sm:hidden"
        >
          <AppNavLink :to="applyLink.to">
            {{ applyLink.label }}
          </AppNavLink>
        </Button>
        <MobileNavigation :active-section="activeSection" />
      </div>
    </div>
  </header>
</template>
