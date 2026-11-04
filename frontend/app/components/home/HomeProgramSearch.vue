<script setup lang="ts">
import ProgramSearchFields from '~/components/programs/ProgramSearchFields.vue'
import { programLevelLabels } from '~/data/programs'

const { data: programs } = await usePrograms()
const { filters, setKeyword, setLevel, setDomain } = useProgramFilters()
const { goToSection } = useSectionNavigation()

const levels = computed(() => availableLevels(programs.value))
const domains = computed(() => domainsForLevel(programs.value, filters.value.level))

async function showResults() {
  await goToSection('formations')
}
</script>

<template>
  <section aria-labelledby="search-title">
    <Card>
      <CardHeader>
        <CardTitle>
          <h2
            id="search-title"
            class="m-0 text-base font-semibold"
          >
            Trouvez votre formation
          </h2>
        </CardTitle>
        <CardDescription>
          {{ levels.map(value => programLevelLabels[value]).join(', ') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          role="search"
          class="grid grid-cols-2 gap-4 lg:grid-cols-[minmax(0,1fr)_12rem_12rem_auto] lg:items-end"
          @submit.prevent="showResults"
        >
          <ProgramSearchFields
            id-prefix="program"
            :levels="levels"
            :domains="domains"
            :keyword="filters.keyword"
            :level="filters.level"
            :domain="filters.domain"
            @update:keyword="setKeyword"
            @update:level="setLevel"
            @update:domain="setDomain"
          />
          <Button
            type="submit"
            class="col-span-2 lg:col-span-1"
          >
            Rechercher
          </Button>
        </form>
      </CardContent>
    </Card>
  </section>
</template>
