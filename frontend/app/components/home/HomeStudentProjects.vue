<script setup lang="ts">
import type { Component } from 'vue'
import { Lightbulb, MapPinned, Palette, Search } from '@lucide/vue'
import { studentProjects } from '~/data/home'

const icons: Record<string, Component> = {
  'produit': Lightbulb,
  'etude-marche': Search,
  'marque': Palette,
  'territorial': MapPinned,
}
</script>

<template>
  <IugmSection
    id="projets"
    labelledby="projets-title"
    content-class="flex flex-col gap-10"
  >
    <IugmSectionHeading
      id="projets-title"
      title="Les étudiants"
      highlight="créent."
      description="Produits, marques, études de marché, projets pour leur territoire : les étudiants de l’IUGM présentent leur travail comme de vrais professionnels."
    />

    <ul
      v-reveal.fade
      class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li
        v-for="project in studentProjects"
        :key="project.id"
      >
        <Card class="h-full">
          <CardHeader class="gap-3">
            <span class="grid size-9 place-items-center rounded-md bg-accent text-primary">
              <component
                :is="icons[project.id]"
                class="size-4"
                aria-hidden="true"
              />
            </span>
            <CardTitle>
              <h3 class="m-0 text-base font-semibold">
                {{ project.type }}
              </h3>
            </CardTitle>
          </CardHeader>
        </Card>
      </li>
    </ul>
  </IugmSection>
</template>
