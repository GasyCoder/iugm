<script setup lang="ts">
import { institution } from '~/data/institution'

definePageMeta({ headerOverlay: true })

usePageSeo({
  description: `${institution.name} (${institution.acronym}), ${institution.parent} : formations en gestion, commerce et économie — Licence, Master et formation à distance.`,
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
