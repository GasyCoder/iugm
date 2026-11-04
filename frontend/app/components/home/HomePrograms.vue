<script setup lang="ts">
import type { ProgramLevel } from '~/types/program'
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
</script>

<template>
  <IugmSection
    id="formations"
    labelledby="formations-title"
    tone="muted"
  >
    <Tabs
      v-model="activeTab"
      class="flex flex-col gap-8"
    >
      <div class="flex flex-wrap items-end justify-between gap-6">
        <IugmSectionHeading
          id="formations-title"
          title="Gestion, commerce, économie&#8239;:"
          highlight="choisissez votre parcours."
          description="Licence, Master et formation à distance : consultez la fiche de chaque formation."
        />
        <IugmArrowLink
          to="/formations"
          variant="outline"
          size="default"
        >
          Voir le catalogue complet
        </IugmArrowLink>
      </div>

      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <TabsList
          aria-label="Niveau"
          class="max-w-full shrink-0 bg-border/70"
        >
          <TabsTrigger
            v-for="tab in levelTabs"
            :key="tab.value"
            :value="tab.value"
            class="cursor-pointer px-2.5 sm:px-3"
          >
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>

        <div
          role="group"
          aria-label="Domaine"
          class="flex flex-wrap gap-2 lg:flex-1"
        >
          <Button
            size="sm"
            :variant="filters.domain === null ? 'default' : 'outline'"
            :aria-pressed="filters.domain === null"
            @click="setDomain(null)"
          >
            Tous
          </Button>
          <Button
            v-for="domain in domains"
            :key="domain"
            size="sm"
            :variant="filters.domain === domain ? 'default' : 'outline'"
            :aria-pressed="filters.domain === domain"
            @click="setDomain(domain)"
          >
            {{ programDomainLabels[domain] }}
          </Button>
        </div>

        <p
          class="m-0 shrink-0 text-sm text-foreground-muted"
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
        class="rounded-xl"
      >
        <ul
          v-if="visible.length > 0"
          class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="program in visible"
            :key="program.id"
          >
            <ProgramCard :program="program" />
          </li>
        </ul>
        <Card v-else>
          <CardHeader>
            <CardTitle class="text-lg font-semibold">
              Aucun parcours ne correspond à ces critères.
            </CardTitle>
            <CardDescription>
              Essayez un autre mot-clé, un autre niveau ou un autre domaine.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              @click="searchEverywhere('')"
            >
              Voir toutes les formations
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </IugmSection>
</template>
