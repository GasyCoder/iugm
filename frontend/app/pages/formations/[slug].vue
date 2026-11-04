<script setup lang="ts">
import ProgramCard from '~/components/programs/ProgramCard.vue'
import { licenceBrochureFacts } from '~/data/admissions'
import { institution } from '~/data/institution'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

const route = useRoute()
const { data: programs } = await usePrograms()
const slug = String(route.params.slug)
const found = programs.value.find(item => item.slug === slug)

if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Formation introuvable', fatal: true })
}

const program = found
const levelLabel = programLevelLabels[program.level]
const domainLabel = programDomainLabels[program.domain]
const admission = documentedAdmission(program)
const related = relatedPrograms(programs.value, program)
const isDistance = program.level === 'distance'
const isLicence = program.level === 'licence'

usePageSeo({
  title: program.title,
  description: `${program.title} — ${levelLabel}, domaine ${domainLabel}, à l’${institution.acronym} (${institution.parent}).${admission ? ` ${admission}.` : ''}`,
})

const termClass = 'text-sm text-foreground-muted'
const definitionClass = 'm-0 text-base font-medium text-foreground'
</script>

<template>
  <div>
    <IugmPageHero
      :eyebrow="`${levelLabel} · ${domainLabel}`"
      :title="program.title"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Formations', to: '/formations' }, { label: program.title }]"
    />

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
    >
      <div class="flex min-w-0 flex-col gap-8">
        <section aria-labelledby="program-facts">
          <h2
            id="program-facts"
            class="m-0 text-xl font-semibold tracking-tight md:text-2xl"
          >
            L’essentiel
          </h2>
          <dl class="m-0 mt-4 grid grid-cols-1 border-t sm:grid-cols-2 sm:gap-x-8">
            <div class="flex flex-col gap-1 border-b py-3.5">
              <dt :class="termClass">
                Offre
              </dt>
              <dd :class="definitionClass">
                {{ levelLabel }}
              </dd>
            </div>
            <div class="flex flex-col gap-1 border-b py-3.5">
              <dt :class="termClass">
                Domaine
              </dt>
              <dd :class="definitionClass">
                {{ domainLabel }}
              </dd>
            </div>
            <div class="flex flex-col gap-1 border-b py-3.5">
              <dt :class="termClass">
                Conditions d’accès
              </dt>
              <dd :class="definitionClass">
                {{ admission ?? 'Renseignez-vous auprès de l’IUGM' }}
              </dd>
            </div>
            <div
              v-if="isLicence"
              class="flex flex-col gap-1 border-b py-3.5"
            >
              <dt :class="termClass">
                Admission
              </dt>
              <dd :class="definitionClass">
                {{ licenceBrochureFacts[1] }}
              </dd>
            </div>
          </dl>
        </section>

        <div class="flex flex-col gap-3 sm:flex-row">
          <Button
            as-child
            size="lg"
          >
            <NuxtLink to="/admissions">
              Comment candidater
            </NuxtLink>
          </Button>
          <Button
            as-child
            size="lg"
            variant="outline"
          >
            <NuxtLink to="/formations">
              Toutes les formations
            </NuxtLink>
          </Button>
        </div>
      </div>

      <aside
        aria-label="Coordonnées"
        class="min-w-0"
      >
        <IugmContactPanel :distance="isDistance" />
      </aside>
    </IugmSection>

    <IugmSection
      v-if="related.length > 0"
      labelledby="program-related"
      tone="muted"
      content-class="flex flex-col gap-6"
    >
      <h2
        id="program-related"
        class="m-0 text-xl font-semibold tracking-tight md:text-2xl"
      >
        Autres formations · {{ levelLabel }}
      </h2>
      <ul class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in related"
          :key="item.id"
        >
          <ProgramCard :program="item" />
        </li>
      </ul>
    </IugmSection>
  </div>
</template>
