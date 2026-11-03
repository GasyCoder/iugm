<script setup lang="ts">
import type { ProgramDomain, ProgramLevel } from '~/types/program'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

const { data: programs } = await usePrograms()
const { filters, setKeyword, setLevel, setDomain } = useProgramFilters()
const { goToSection } = useSectionNavigation()

const levels = computed(() => availableLevels(programs.value))
const domains = computed(() => domainsForLevel(programs.value, filters.value.level))

// Les champs écrivent directement dans l'état partagé : l'explorateur se met à jour en direct.
const keyword = computed({
  get: () => filters.value.keyword,
  set: value => setKeyword(value),
})
const level = computed({
  get: () => filters.value.level ?? '',
  set: (value: ProgramLevel | '') => setLevel(value || null),
})
const domain = computed({
  get: () => filters.value.domain ?? '',
  set: (value: ProgramDomain | '') => setDomain(value || null),
})

async function showResults() {
  await goToSection('formations')
}

const fieldClass = 'h-11 w-full rounded border border-border bg-white px-3 text-[15px] text-foreground focus:border-primary lg:h-13'
const labelClass = 'text-xs font-semibold text-foreground-muted'
</script>

<template>
  <section
    aria-labelledby="search-title"
    class="rounded-lg bg-surface p-4.5 shadow-[0_12px_30px_-18px_rgb(13_21_80/0.5)] lg:rounded-none lg:rounded-t-md lg:px-8 lg:py-7 lg:shadow-none"
  >
    <form
      role="search"
      class="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_11rem_11rem_auto] lg:items-end lg:gap-4 xl:grid-cols-[13.75rem_minmax(0,1fr)_12.5rem_12.5rem_10.5rem]"
      @submit.prevent="showResults"
    >
      <div class="flex flex-col gap-0.5 lg:col-span-4 lg:flex-row lg:items-baseline lg:gap-3 xl:col-span-1 xl:flex-col xl:items-start xl:gap-1.5">
        <h2
          id="search-title"
          class="m-0 text-[17px] font-bold text-primary-strong lg:text-xl"
        >
          Trouvez votre formation
        </h2>
        <p class="m-0 text-[13px] text-foreground-muted">
          {{ levels.map(value => programLevelLabels[value]).join(', ') }}
        </p>
      </div>

      <div class="flex flex-col gap-1.5">
        <label
          for="program-keyword"
          :class="labelClass"
          class="sr-only lg:not-sr-only"
        >Mot-clé</label>
        <div class="relative">
          <input
            id="program-keyword"
            v-model="keyword"
            type="search"
            enterkeyhint="search"
            autocomplete="off"
            placeholder="Finance, marketing, RH…"
            class="h-12 w-full rounded-full border border-border bg-white pr-14 pl-4.5 text-[15px] text-foreground placeholder:text-foreground-muted focus:border-primary lg:h-13 lg:rounded lg:px-4"
          >
          <button
            type="submit"
            class="absolute top-1/2 right-1.5 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-colors duration-150 hover:bg-iugm-blue-800 lg:hidden"
          >
            <span aria-hidden="true">→</span>
            <span class="sr-only">Voir les formations</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2.5 lg:contents">
        <div class="flex min-w-0 flex-col gap-1.5">
          <label
            for="program-level"
            :class="labelClass"
          >Niveau</label>
          <select
            id="program-level"
            v-model="level"
            :class="fieldClass"
          >
            <option value="">
              Tous niveaux
            </option>
            <option
              v-for="value in levels"
              :key="value"
              :value="value"
            >
              {{ programLevelLabels[value] }}
            </option>
          </select>
        </div>
        <div class="flex min-w-0 flex-col gap-1.5">
          <label
            for="program-domain"
            :class="labelClass"
          >Domaine</label>
          <select
            id="program-domain"
            v-model="domain"
            :class="fieldClass"
          >
            <option value="">
              Tous domaines
            </option>
            <option
              v-for="value in domains"
              :key="value"
              :value="value"
            >
              {{ programDomainLabels[value] }}
            </option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        class="hidden lg:flex"
      >
        Rechercher
      </Button>
    </form>
  </section>
</template>
