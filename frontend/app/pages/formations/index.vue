<script setup lang="ts">
import ProgramCard from '~/components/programs/ProgramCard.vue'
import ProgramSearchFields from '~/components/programs/ProgramSearchFields.vue'

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

const resultLabel = computed(() => {
  const count = visible.value.length
  return `${count} formation${count > 1 ? 's' : ''}${hasCriteria.value ? ' correspondant à votre recherche' : ''}`
})
</script>

<template>
  <div>
    <IugmPageHero
      title="Toutes les formations de l’IUGM"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Formations' }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        Licence, Master et formation à distance. Recherchez par mot-clé, niveau ou domaine, puis ouvrez la fiche d’une formation.
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="flex flex-col gap-6 pt-8 lg:pt-10"
    >
      <Card>
        <CardContent>
          <form
            role="search"
            aria-label="Rechercher une formation"
            class="grid grid-cols-2 gap-4 lg:grid-cols-[minmax(0,1fr)_14rem_14rem]"
            @submit.prevent
          >
            <ProgramSearchFields
              id-prefix="catalog"
              :levels="levels"
              :domains="domains"
              :keyword="filters.keyword"
              :level="filters.level"
              :domain="filters.domain"
              @update:keyword="setKeyword"
              @update:level="setLevel"
              @update:domain="setDomain"
            />
          </form>
        </CardContent>
      </Card>

      <div class="flex min-h-10 items-center justify-between gap-4">
        <h2
          class="m-0 text-base font-semibold"
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
            Aucune formation ne correspond à ces critères.
          </CardTitle>
          <CardDescription>
            Essayez un autre mot-clé, un autre niveau ou un autre domaine.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="outline"
            @click="reset"
          >
            Voir toutes les formations
          </Button>
        </CardFooter>
      </Card>
    </IugmSection>
  </div>
</template>
