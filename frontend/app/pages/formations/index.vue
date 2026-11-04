<script setup lang="ts">
import type { ProgramDomain, ProgramLevel } from '~/types/program'
import ProgramCard from '~/components/programs/ProgramCard.vue'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

usePageSeo({
  title: 'Formations',
  description: 'Toutes les formations de l’IUGM présentées dans ses brochures : Licence, Master et formation à distance, en gestion, commerce, marketing, économie, finances et management.',
})

const { data: programs } = await usePrograms()
const { filters, setKeyword, setLevel, setDomain, reset } = useCatalogFilters()

const levels = computed(() => availableLevels(programs.value))
const domains = computed(() => domainsForLevel(programs.value, filters.value.level))
const visible = computed(() => filterPrograms(programs.value, filters.value))
const hasCriteria = computed(() => Object.keys(filtersToQuery(filters.value)).length > 0)

const level = computed({
  get: () => filters.value.level ?? '',
  set: (value: ProgramLevel | '') => setLevel(value || null),
})
const domain = computed({
  get: () => filters.value.domain ?? '',
  set: (value: ProgramDomain | '') => setDomain(value || null),
})

const resultLabel = computed(() => {
  const count = visible.value.length
  return `${count} formation${count > 1 ? 's' : ''}${hasCriteria.value ? ' correspondant à votre recherche' : ''}`
})

const fieldClass = 'h-12 w-full rounded border border-border bg-white px-3 text-[15px] text-foreground focus:border-primary'
const labelClass = 'text-xs font-semibold text-foreground-muted'
</script>

<template>
  <div>
    <IugmPageHero
      eyebrow="Formations"
      title="Toutes les formations de l’IUGM"
    >
      <p class="m-0 max-w-2xl text-base text-iugm-blue-100 md:text-lg">
        Licence, Master et formation à distance. Recherchez par mot-clé, niveau ou domaine, puis ouvrez la fiche d’une formation.
      </p>
      <IugmPendingTag
        tone="dark"
        label="SOURCE : BROCHURES IUGM · À CONFIRMER PAR L’IUGM"
      />
    </IugmPageHero>

    <IugmSection
      spacing="bottom"
      content-class="flex flex-col gap-6 pt-8 md:pt-10"
    >
      <form
        role="search"
        aria-label="Rechercher une formation"
        class="grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-4.5 lg:grid-cols-[minmax(0,1fr)_14rem_14rem] lg:gap-4 lg:p-6"
        @submit.prevent
      >
        <div class="col-span-2 flex flex-col gap-1.5 lg:col-span-1">
          <label
            for="catalog-keyword"
            :class="labelClass"
          >Mot-clé</label>
          <input
            id="catalog-keyword"
            :value="filters.keyword"
            type="search"
            enterkeyhint="search"
            autocomplete="off"
            placeholder="Finance, marketing, RH…"
            :class="fieldClass"
            class="placeholder:text-foreground-muted"
            @input="setKeyword(($event.target as HTMLInputElement).value)"
          >
        </div>
        <div class="flex min-w-0 flex-col gap-1.5">
          <label
            for="catalog-level"
            :class="labelClass"
          >Niveau</label>
          <select
            id="catalog-level"
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
            for="catalog-domain"
            :class="labelClass"
          >Domaine</label>
          <select
            id="catalog-domain"
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
      </form>

      <div class="flex min-h-11 items-center justify-between gap-4 border-b border-border pb-4">
        <h2
          class="m-0 text-base font-bold text-primary-strong"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ resultLabel }}
        </h2>
        <Button
          v-if="hasCriteria"
          variant="ghost"
          size="sm"
          @click="reset"
        >
          Effacer les critères
        </Button>
      </div>

      <ul
        v-if="visible.length > 0"
        class="m-0 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4"
      >
        <li
          v-for="program in visible"
          :key="program.id"
        >
          <ProgramCard :program="program" />
        </li>
      </ul>
      <div
        v-else
        class="flex flex-col items-start gap-4 rounded border border-dashed border-sand-300 bg-surface p-6 md:p-8"
      >
        <p class="m-0 text-lg font-bold text-primary-strong">
          Aucune formation ne correspond à ces critères.
        </p>
        <p class="m-0 text-sm text-foreground-muted">
          Essayez un autre mot-clé, un autre niveau ou un autre domaine.
        </p>
        <Button
          variant="outline"
          size="sm"
          @click="reset"
        >
          Voir toutes les formations
        </Button>
      </div>
    </IugmSection>
  </div>
</template>
