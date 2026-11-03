<script setup lang="ts">
import { useMounted, useWindowScroll } from '@vueuse/core'
import { applyLink, mainNavigation, mobileNavigation } from '~/data/navigation'
import { institution } from '~/data/institution'

const props = withDefaults(defineProps<{
  /** Header transparent au-dessus d'un Hero photo, opaque après 40 px de scroll. */
  overlay?: boolean
}>(), {
  overlay: false,
})

const isMounted = useMounted()
const { y } = useWindowScroll()
const solid = computed(() => !props.overlay || (isMounted.value && y.value > 40))

const sectionIds = [...new Set(mobileNavigation.flatMap(item => (item.sectionId ? [item.sectionId] : [])))]
const activeSection = useActiveSection(sectionIds)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ease-out-soft"
    :class="solid
      ? 'border-border bg-sand-50/95 shadow-header backdrop-blur'
      : 'border-white/15 bg-transparent focus-on-dark'"
  >
    <div class="w-full px-gutter">
      <div class="flex h-16 items-center justify-between gap-6 lg:h-20">
        <NuxtLink
          to="/"
          class="flex min-w-0 items-center gap-3 no-underline"
          :aria-label="`${institution.acronym} — Accueil`"
        >
          <IugmLogo
            :size="48"
            class="size-10 lg:size-12"
          />
          <span class="flex min-w-0 flex-col leading-tight">
            <span
              class="text-lg font-extrabold tracking-tight transition-colors duration-200 lg:text-xl"
              :class="solid ? 'text-primary-strong' : 'text-white'"
            >{{ institution.acronym }}</span>
            <!-- Nom complet : une ligne, ou deux lignes quand la navigation complète occupe la barre (xl → 2xl). -->
            <span
              class="hidden truncate text-[11px] transition-colors duration-200 sm:block lg:text-xs xl:max-w-52 xl:whitespace-normal 2xl:max-w-none 2xl:whitespace-nowrap"
              :class="solid ? 'text-foreground-muted' : 'text-iugm-blue-100'"
            >{{ institution.name }}</span>
          </span>
        </NuxtLink>

        <nav
          aria-label="Navigation principale"
          class="hidden items-center gap-7 text-[15px] font-medium whitespace-nowrap xl:flex"
        >
          <AppNavLink
            v-for="item in mainNavigation"
            :key="item.label"
            :to="item.to"
            :aria-current="activeSection === item.sectionId ? 'location' : undefined"
            class="relative no-underline transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-iugm-green-500 after:transition-transform after:duration-240 after:ease-out-soft aria-[current=location]:after:scale-x-100"
            :class="solid
              ? 'text-foreground hover:text-primary aria-[current=location]:text-primary'
              : 'text-white hover:text-iugm-green-300'"
          >
            {{ item.label }}
          </AppNavLink>
        </nav>

        <div class="flex shrink-0 items-center gap-2">
          <Button
            as-child
            size="sm"
            :variant="solid ? 'default' : 'light'"
          >
            <AppNavLink :to="applyLink.to">
              {{ applyLink.label }}
            </AppNavLink>
          </Button>
          <MobileNavigation
            :solid="solid"
            :active-section="activeSection"
          />
        </div>
      </div>
    </div>
  </header>
</template>
