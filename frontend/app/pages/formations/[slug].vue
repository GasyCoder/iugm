<script setup lang="ts">
import ProgramCard from '~/components/programs/ProgramCard.vue'
import { licenceBrochureFacts, programPendingTopics, programSourceLabels } from '~/data/admissions'
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
  description: `${program.title} — ${levelLabel}, domaine ${domainLabel}, à l’${institution.acronym} (${institution.parent}).${admission ? ` ${admission}.` : ''} Informations issues des brochures de l’Institut.`,
})

const termClass = 'text-sm font-semibold text-foreground-muted'
const definitionClass = 'm-0 text-base font-semibold text-foreground'
</script>

<template>
  <div>
    <IugmPageHero
      :eyebrow="`${levelLabel} · ${domainLabel}`"
      :title="program.title"
      size="compact"
    >
      <template #before>
        <nav aria-label="Fil d’Ariane">
          <ol class="m-0 flex list-none flex-wrap gap-x-2 p-0 text-sm text-iugm-blue-100">
            <li>
              <NuxtLink
                to="/"
                class="text-iugm-blue-100 hover:text-iugm-green-300"
              >
                Accueil
              </NuxtLink>
              <span
                aria-hidden="true"
                class="ml-2"
              >/</span>
            </li>
            <li>
              <NuxtLink
                to="/formations"
                class="text-iugm-blue-100 hover:text-iugm-green-300"
              >
                Formations
              </NuxtLink>
            </li>
          </ol>
        </nav>
      </template>
      <IugmPendingTag
        tone="dark"
        :label="program.status === 'pending' ? 'NIVEAU À CONFIRMER PAR L’IUGM' : 'SOURCE : BROCHURE IUGM · À CONFIRMER PAR L’IUGM'"
      />
    </IugmPageHero>

    <IugmSection
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
    >
      <div class="flex min-w-0 flex-col gap-10">
        <section aria-labelledby="program-facts">
          <h2
            id="program-facts"
            class="m-0 text-xl font-bold text-primary-strong md:text-2xl"
          >
            Ce qu’indique la brochure
          </h2>
          <dl class="m-0 mt-4 grid grid-cols-1 border-t border-border sm:grid-cols-2 sm:gap-x-8">
            <div class="flex flex-col gap-1 border-b border-border py-3.5">
              <dt :class="termClass">
                Offre
              </dt>
              <dd :class="definitionClass">
                {{ levelLabel }}
              </dd>
            </div>
            <div class="flex flex-col gap-1 border-b border-border py-3.5">
              <dt :class="termClass">
                Domaine
              </dt>
              <dd :class="definitionClass">
                {{ domainLabel }}
              </dd>
            </div>
            <div class="flex flex-col gap-1 border-b border-border py-3.5">
              <dt :class="termClass">
                Conditions d’accès
              </dt>
              <dd
                v-if="admission"
                :class="definitionClass"
              >
                {{ admission }}
              </dd>
              <dd
                v-else
                class="m-0 flex flex-col gap-1"
              >
                <span class="text-base text-foreground">Non précisées dans la brochure.</span>
                <IugmPendingTag />
              </dd>
            </div>
            <div
              v-if="isLicence"
              class="flex flex-col gap-1 border-b border-border py-3.5"
            >
              <dt :class="termClass">
                Admission
              </dt>
              <dd :class="definitionClass">
                {{ licenceBrochureFacts[1] }}
              </dd>
            </div>
            <div class="flex flex-col gap-1 border-b border-border py-3.5 sm:col-span-2">
              <dt :class="termClass">
                Source
              </dt>
              <dd class="m-0 text-base text-foreground">
                {{ programSourceLabels[program.level] }}
              </dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="program-pending"
          class="rounded border border-dashed border-sand-300 bg-surface p-5 md:p-6"
        >
          <h2
            id="program-pending"
            class="m-0 text-lg font-bold text-primary-strong"
          >
            Reste à confirmer par l’IUGM
          </h2>
          <p class="mt-1 mb-3 text-sm text-foreground-muted">
            Ces informations ne figurent pas dans la brochure. Elles seront publiées une fois communiquées par l’Institut.
          </p>
          <ul class="m-0 grid list-disc grid-cols-1 gap-1 pl-5 text-[15px] sm:grid-cols-2 sm:gap-x-8">
            <li
              v-for="topic in programPendingTopics"
              :key="topic"
            >
              {{ topic }}
            </li>
          </ul>
        </section>

        <div class="flex flex-col gap-3 sm:flex-row">
          <Button as-child>
            <NuxtLink to="/admissions">
              Comment candidater
            </NuxtLink>
          </Button>
          <Button
            as-child
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
      tone="surface"
      content-class="flex flex-col gap-6"
    >
      <h2
        id="program-related"
        class="m-0 text-xl font-bold text-primary-strong md:text-2xl"
      >
        Autres formations · {{ levelLabel }}
      </h2>
      <ul class="m-0 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
