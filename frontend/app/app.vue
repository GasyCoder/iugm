<script setup lang="ts">
import { institution } from '~/data/institution'

useHead({
  titleTemplate: title => (title ? `${title} · ${institution.acronym}` : `${institution.acronym} | ${institution.name}`),
})

useSeoMeta({
  ogSiteName: `${institution.acronym} | ${institution.name}`,
  ogLocale: 'fr_MG',
  ogType: 'website',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
