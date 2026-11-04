<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() => (isNotFound.value ? 'Page introuvable' : 'Une erreur est survenue'))

usePageSeo({
  title: title.value,
  description: 'Cette page n’est pas disponible sur le site de l’IUGM.',
  noindex: true,
})
</script>

<template>
  <NuxtLayout>
    <IugmPageHero
      :eyebrow="`Erreur ${error.statusCode}`"
      :title="title"
    >
      <p class="m-0 max-w-2xl text-base text-iugm-blue-100 md:text-lg">
        {{ isNotFound
          ? 'Cette adresse ne correspond à aucune page du site. Elle a peut-être changé ou contient une erreur.'
          : 'La page n’a pas pu s’afficher. Vous pouvez réessayer ou revenir à l’accueil.' }}
      </p>
      <div class="mt-2 flex flex-col gap-3 sm:flex-row">
        <IugmArrowLink to="/formations">
          Voir les formations
        </IugmArrowLink>
        <Button
          as-child
          variant="outlineLight"
        >
          <NuxtLink to="/">
            Retour à l’accueil
          </NuxtLink>
        </Button>
      </div>
    </IugmPageHero>
  </NuxtLayout>
</template>
