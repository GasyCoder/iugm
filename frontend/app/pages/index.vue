<script setup lang="ts">
import { articles } from '~/data/articles'
import { publishedTestimonials } from '~/data/home'
import { institution } from '~/data/institution'

const hasNews = publishedArticles(articles).length > 0

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
    <HomeAnnouncements />
    <HomeIntroduction />
    <HomeDirectorMessage />
    <HomePrograms />
    <HomeAdmissions />
    <HomePedagogy />
    <HomeStudentProjects />
    <HomeBusiness />
    <HomeTestimonials v-if="publishedTestimonials.length > 0" />
    <HomeNews v-if="hasNews" />
    <HomeCta />
  </div>
</template>
