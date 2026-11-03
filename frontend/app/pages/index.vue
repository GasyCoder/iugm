<script setup lang="ts">
import { institution } from '~/data/institution'

definePageMeta({ headerOverlay: true })

const description = `${institution.name} (${institution.acronym}), ${institution.parent} : formations en gestion, commerce et économie — Licence, Master et formation à distance.`

useSeoMeta({
  description,
  ogTitle: `${institution.acronym} — ${institution.name}`,
  ogDescription: description,
})
</script>

<template>
  <div>
    <HomeHero>
      <template #search>
        <HomeProgramSearch />
      </template>
    </HomeHero>
    <HomeIntroduction />
    <HomeKeyFigures />
    <HomePrograms />
    <HomeAdmissions />
    <HomePedagogy />
    <HomeStudentProjects />
    <HomeBusiness />
    <HomeTestimonials />
    <HomeNews />
    <HomeCampusLife />
    <HomeCta />
  </div>
</template>
