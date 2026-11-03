<script setup lang="ts">
import { studentProjects } from '~/data/home'

// Grille éditoriale asymétrique (v2) : 1er projet 2×2, 4e projet sur deux colonnes.
const desktopSpan: Record<number, string> = {
  0: 'md:col-span-2 md:row-span-2',
  3: 'md:col-span-2',
}
</script>

<template>
  <IugmSection
    id="projets"
    labelledby="projets-title"
    content-class="flex flex-col gap-8"
  >
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-end lg:gap-20">
      <IugmSectionHeading
        id="projets-title"
        eyebrow="Projets étudiants"
        title="Les étudiants créent."
      />
      <p class="m-0 text-base leading-relaxed text-foreground-muted md:text-lg">
        Produits, marques, études de marché, projets pour leur territoire : les étudiants de l’IUGM présentent leur travail comme de vrais professionnels.
      </p>
    </div>

    <!-- Mobile : défilement horizontal à snap (sans auto-play). Desktop : grille. -->
    <div
      role="region"
      aria-label="Projets étudiants, défilement horizontal"
      tabindex="0"
      class="-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:snap-none md:overflow-visible md:px-0"
    >
      <ul
        v-reveal.fade
        class="m-0 flex list-none gap-3 p-0 md:grid md:grid-cols-4 md:grid-rows-[16.25rem_16.25rem] md:gap-4"
      >
        <li
          v-for="(project, index) in studentProjects"
          :key="project.id"
          class="flex h-90 w-[78%] shrink-0 snap-start flex-col gap-2.5 md:h-auto md:w-auto"
          :class="desktopSpan[index]"
        >
          <IugmImagePlaceholder
            :subject="project.photoSubject"
            caption-position="top"
            class="min-h-0 flex-1 rounded"
          />
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="m-0 text-base font-bold text-foreground">
              {{ project.type }}
            </h3>
            <IugmPendingTag label="PROJET À CONFIRMER" />
          </div>
        </li>
      </ul>
    </div>
  </IugmSection>
</template>
