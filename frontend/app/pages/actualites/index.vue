<script setup lang="ts">
import ArticleCard from '~/components/news/ArticleCard.vue'
import { articles } from '~/data/articles'
import { institution } from '~/data/institution'

usePageSeo({
  title: 'Actualités',
  description: `Les actualités de l’${institution.acronym} et de l’${institution.parent} : vie de l’Institut, projets et rencontres.`,
})

const list = publishedArticles(articles)
</script>

<template>
  <div>
    <IugmPageHero
      title="Actualités"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Actualités' }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        La vie de l’Institut, ses étudiants et ses projets.
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="pt-10"
    >
      <ul
        v-if="list.length > 0"
        class="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="item in list"
          :key="item.slug"
        >
          <ArticleCard :article="item" />
        </li>
      </ul>
      <p
        v-else
        class="m-0 text-foreground-muted"
      >
        Aucune actualité pour le moment.
      </p>
    </IugmSection>
  </div>
</template>
