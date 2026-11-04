<script setup lang="ts">
import type { ProgramLevel } from '~/types/program'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import ProgramCard from '~/components/programs/ProgramCard.vue'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

const ALL = 'tous'
type LevelTab = ProgramLevel | typeof ALL

const { data: programs } = await usePrograms()
const { filters, setLevel, setDomain, searchEverywhere } = useProgramFilters()

const levelTabs = computed<{ value: LevelTab, label: string }[]>(() => [
  { value: ALL, label: 'Tous' },
  ...availableLevels(programs.value).map(level => ({ value: level, label: programLevelLabels[level] })),
])

const activeTab = computed<LevelTab>({
  get: () => filters.value.level ?? ALL,
  set: value => setLevel(value === ALL ? null : value),
})

const domains = computed(() => domainsForLevel(programs.value, filters.value.level))
const visible = computed(() => filterPrograms(programs.value, filters.value))

const levelLabel = computed(() => (filters.value.level ? programLevelLabels[filters.value.level] : 'tous niveaux'))
const keyword = computed(() => filters.value.keyword.trim())
const resultLabel = computed(() => {
  const count = visible.value.length
  const base = `${count} parcours · ${levelLabel.value}`
  return keyword.value ? `${base} · « ${keyword.value} »` : base
})

const chipClass = 'h-9 shrink-0 cursor-pointer rounded-full border px-4 text-[13px] font-semibold transition-colors duration-240 ease-out-soft'
</script>

<template>
  <IugmSection
    id="formations"
    labelledby="formations-title"
    spacing="top"
    content-class="pb-12"
  >
    <TabsRoot
      v-model="activeTab"
      class="flex flex-col gap-6"
    >
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <IugmSectionHeading
          id="formations-title"
          eyebrow="Nos formations"
          title="Gestion, commerce, économie&#8239;: choisissez votre parcours."
          class="max-w-3xl"
        />
        <TabsList
          aria-label="Niveau"
          class="flex shrink-0 gap-1 rounded-full bg-sand-200 p-1"
        >
          <TabsTrigger
            v-for="tab in levelTabs"
            :key="tab.value"
            :value="tab.value"
            class="h-10 flex-auto cursor-pointer rounded-full px-2.5 text-[13px] font-semibold whitespace-nowrap text-foreground transition-colors duration-240 ease-out-soft hover:bg-sand-50 data-[state=active]:bg-primary data-[state=active]:text-white sm:px-5 sm:text-sm"
          >
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
      </div>

      <div class="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div
          role="group"
          aria-label="Domaine"
          class="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
        >
          <button
            type="button"
            :aria-pressed="filters.domain === null"
            :class="[chipClass, filters.domain === null ? 'border-primary-strong bg-primary-strong text-white' : 'border-border bg-transparent text-foreground hover:border-iugm-blue-300']"
            @click="setDomain(null)"
          >
            Tous
          </button>
          <button
            v-for="domain in domains"
            :key="domain"
            type="button"
            :aria-pressed="filters.domain === domain"
            :class="[chipClass, filters.domain === domain ? 'border-primary-strong bg-primary-strong text-white' : 'border-border bg-transparent text-foreground hover:border-iugm-blue-300']"
            @click="setDomain(domain)"
          >
            {{ programDomainLabels[domain] }}
          </button>
        </div>
        <span
          aria-hidden="true"
          class="hidden shrink-0 text-sm text-foreground-muted md:block"
        >{{ resultLabel }}</span>
        <p
          class="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {{ resultLabel }}
        </p>
      </div>

      <TabsContent
        v-for="tab in levelTabs"
        :key="tab.value"
        :value="tab.value"
        class="rounded"
      >
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
            Aucun parcours ne correspond à ces critères.
          </p>
          <p class="m-0 text-sm text-foreground-muted">
            Essayez un autre mot-clé, un autre niveau ou un autre domaine.
          </p>
          <Button
            variant="outline"
            size="sm"
            @click="searchEverywhere('')"
          >
            Voir toutes les formations
          </Button>
        </div>
        <p class="m-0 pt-3 font-mono text-[11px] text-warning sm:hidden">
          SOURCE : BROCHURES IUGM · À CONFIRMER
        </p>
      </TabsContent>
      <NuxtLink
        to="/formations"
        class="self-start text-[15px] font-semibold"
      >
        Voir le catalogue complet <span aria-hidden="true">→</span>
      </NuxtLink>
    </TabsRoot>
  </IugmSection>
</template>
