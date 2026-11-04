<script setup lang="ts">
import { publishedNews, publishedTestimonials } from '~/data/home'
import { institution } from '~/data/institution'

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
    <HomeDirectorMessage />
    <HomePrograms />
    <HomeAdmissions />
    <HomePedagogy />
    <HomeStudentProjects />
    <HomeBusiness />
    <HomeTestimonials v-if="publishedTestimonials.length > 0" />
    <HomeNews v-if="publishedNews.length > 0" />
    <HomeCampusLife />
    <HomeCta />
  </div>
</template>
