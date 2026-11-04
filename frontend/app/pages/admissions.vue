<script setup lang="ts">
import { licenceBrochureFacts } from '~/data/admissions'
import { admissions } from '~/data/home'

usePageSeo({
  title: 'Admissions',
  description: 'Comment rejoindre l’IUGM : séries de bac acceptées en Licence, sélection de dossiers et coordonnées de l’Institut.',
})

const { data: programs } = await usePrograms()
const licencePrograms = computed(() => programs.value.filter(program => program.level === 'licence'))
</script>

<template>
  <div>
    <IugmPageHero
      title="Comment rejoindre l’IUGM"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Admissions' }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        Les séries de bac acceptées en Licence, les grandes étapes et les coordonnées de l’Institut.
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16"
    >
      <div class="flex min-w-0 flex-col gap-12">
        <p class="m-0 rounded-xl border border-iugm-blue-200 bg-accent p-4 text-[15px] font-medium text-accent-foreground md:p-5">
          Les candidatures ne se font pas sur ce site&#8239;: il ne reçoit ni dossier ni paiement. Adressez-vous directement à l’IUGM.
        </p>

        <section
          aria-labelledby="admission-licence"
          class="flex flex-col gap-4"
        >
          <h2
            id="admission-licence"
            class="m-0 text-xl font-semibold tracking-tight md:text-2xl"
          >
            Licence : séries de bac par formation
          </h2>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
            <li
              v-for="fact in licenceBrochureFacts"
              :key="fact"
            >
              <Badge variant="accent">
                {{ fact }}
              </Badge>
            </li>
          </ul>
          <Table class="text-[15px]">
            <TableCaption class="sr-only">
              Séries de bac acceptées en Licence, pour chaque formation
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="text-foreground-muted">
                  Formation
                </TableHead>
                <TableHead class="text-foreground-muted">
                  Séries de bac
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="program in licencePrograms"
                :key="program.id"
              >
                <TableCell class="py-3 font-medium whitespace-normal">
                  <NuxtLink :to="`/formations/${program.slug}`">
                    {{ program.title }}
                  </NuxtLink>
                </TableCell>
                <TableCell class="py-3 whitespace-normal text-foreground-muted">
                  {{ documentedAdmission(program) }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <section
          aria-labelledby="admission-others"
          class="flex flex-col items-start gap-3"
        >
          <h2
            id="admission-others"
            class="m-0 text-xl font-semibold tracking-tight md:text-2xl"
          >
            Master et formation à distance
          </h2>
          <p class="m-0 text-base leading-relaxed text-foreground-muted">
            Pour connaître les conditions d’accès à ces formations, contactez directement l’IUGM.
          </p>
          <IugmArrowLink
            to="/formations"
            variant="outline"
            size="default"
          >
            Voir toutes les formations
          </IugmArrowLink>
        </section>

        <section
          aria-labelledby="admission-steps"
          class="flex flex-col gap-4"
        >
          <h2
            id="admission-steps"
            class="m-0 text-xl font-semibold tracking-tight md:text-2xl"
          >
            Les grandes étapes
          </h2>
          <ol class="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            <IugmStepCard
              v-for="(step, index) in admissions.steps"
              :key="step.title"
              :number="index + 1"
              :title="step.title"
              :description="step.description"
            />
          </ol>
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
