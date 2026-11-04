<script setup lang="ts">
import { admissionPendingTopics, licenceBrochureFacts } from '~/data/admissions'
import { admissions } from '~/data/home'

usePageSeo({
  title: 'Admissions',
  description: 'Comment rejoindre l’IUGM : séries de bac acceptées en Licence, sélection de dossiers et informations restant à confirmer par l’Institut.',
})

const { data: programs } = await usePrograms()
const licencePrograms = computed(() => programs.value.filter(program => program.level === 'licence'))
</script>

<template>
  <div>
    <IugmPageHero
      eyebrow="Admissions"
      title="Comment rejoindre l’IUGM"
    >
      <p class="m-0 max-w-2xl text-base text-iugm-blue-100 md:text-lg">
        Cette page reprend ce qu’indiquent les brochures de l’Institut. Elle sera complétée dès que l’IUGM aura communiqué la procédure officielle.
      </p>
      <IugmPendingTag
        tone="dark"
        label="PROCÉDURE INDICATIVE · À CONFIRMER PAR L’IUGM"
      />
    </IugmPageHero>

    <IugmSection
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
    >
      <div class="flex min-w-0 flex-col gap-12">
        <p class="m-0 rounded border border-primary/30 bg-surface-muted p-4 text-[15px] font-semibold text-primary-strong md:p-5">
          Les candidatures ne se font pas sur ce site&#8239;: il ne reçoit ni dossier ni paiement. Adressez-vous directement à l’IUGM.
        </p>

        <section
          aria-labelledby="admission-licence"
          class="flex flex-col gap-4"
        >
          <h2
            id="admission-licence"
            class="m-0 text-xl font-bold text-primary-strong md:text-2xl"
          >
            Licence : séries de bac par formation
          </h2>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
            <li
              v-for="fact in licenceBrochureFacts"
              :key="fact"
              class="rounded-sm bg-surface-muted px-2.5 py-1 text-sm font-semibold text-primary-strong"
            >
              {{ fact }}
            </li>
          </ul>
          <table class="w-full border-collapse text-left text-[15px]">
            <caption class="sr-only">
              Séries de bac indiquées par la brochure Licence, pour chaque formation
            </caption>
            <thead>
              <tr class="border-b-2 border-primary-strong text-sm">
                <th
                  scope="col"
                  class="py-2.5 pr-4 font-semibold"
                >
                  Formation
                </th>
                <th
                  scope="col"
                  class="py-2.5 font-semibold"
                >
                  Séries de bac
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="program in licencePrograms"
                :key="program.id"
                class="border-b border-border"
              >
                <th
                  scope="row"
                  class="py-3 pr-4 font-semibold"
                >
                  <NuxtLink :to="`/formations/${program.slug}`">
                    {{ program.title }}
                  </NuxtLink>
                </th>
                <td class="py-3 text-foreground-muted">
                  {{ documentedAdmission(program) }}
                </td>
              </tr>
            </tbody>
          </table>
          <IugmPendingTag label="SOURCE : BROCHURE « NIVEAU LICENCE » · À CONFIRMER PAR L’IUGM" />
        </section>

        <section
          aria-labelledby="admission-others"
          class="flex flex-col gap-3"
        >
          <h2
            id="admission-others"
            class="m-0 text-xl font-bold text-primary-strong md:text-2xl"
          >
            Master et formation à distance
          </h2>
          <p class="m-0 text-base leading-relaxed text-foreground-muted">
            Les brochures présentent ces formations sans préciser leurs conditions d’accès. Aucune condition n’est donc indiquée ici.
          </p>
          <IugmPendingTag />
          <NuxtLink
            to="/formations"
            class="font-semibold"
          >
            Voir toutes les formations <span aria-hidden="true">→</span>
          </NuxtLink>
        </section>

        <section
          aria-labelledby="admission-steps"
          class="flex flex-col gap-4"
        >
          <h2
            id="admission-steps"
            class="m-0 text-xl font-bold text-primary-strong md:text-2xl"
          >
            Les grandes étapes
          </h2>
          <ol class="m-0 flex list-none flex-col p-0">
            <li
              v-for="(step, index) in admissions.steps"
              :key="step.title"
              class="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border py-4 last:border-b"
            >
              <span
                aria-hidden="true"
                class="text-2xl font-bold text-accent-text"
              >{{ index + 1 }}</span>
              <div class="flex flex-col gap-1">
                <h3 class="m-0 text-base font-bold">
                  {{ step.title }}
                </h3>
                <p class="m-0 text-[15px] text-foreground-muted">
                  {{ step.description }}
                </p>
                <IugmPendingTag v-if="step.status === 'pending'" />
              </div>
            </li>
          </ol>
        </section>

        <section
          aria-labelledby="admission-pending"
          class="rounded border border-dashed border-sand-300 bg-surface p-5 md:p-6"
        >
          <h2
            id="admission-pending"
            class="m-0 text-lg font-bold text-primary-strong"
          >
            Reste à confirmer par l’IUGM
          </h2>
          <ul class="m-0 mt-3 flex list-disc flex-col gap-1 pl-5 text-[15px]">
            <li
              v-for="topic in admissionPendingTopics"
              :key="topic"
            >
              {{ topic }}
            </li>
          </ul>
        </section>
      </div>

      <aside
        aria-label="Coordonnées"
        class="min-w-0"
      >
        <IugmContactPanel distance />
      </aside>
    </IugmSection>
  </div>
</template>
