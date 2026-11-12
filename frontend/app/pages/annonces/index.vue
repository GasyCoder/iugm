<script setup lang="ts">
import AnnouncementCard from '~/components/announcements/AnnouncementCard.vue'
import { institution } from '~/data/institution'

usePageSeo({
  title: 'Annonces',
  description: `Flash info et annonces de l’${institution.acronym} : inscriptions, nouveaux parcours et informations importantes.`,
})

const { published } = useAnnouncements()
</script>

<template>
  <div>
    <IugmPageHero
      title="Annonces"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Annonces' }]"
    >
      <p class="m-0 max-w-2xl leading-relaxed text-foreground-muted">
        Les informations importantes de l’Institut&#8239;: inscriptions, nouveaux parcours, dates à retenir.
      </p>
    </IugmPageHero>

    <IugmSection
      :bordered="false"
      spacing="bottom"
      content-class="pt-10"
    >
      <ul
        v-if="published.length > 0"
        class="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2"
      >
        <li
          v-for="item in published"
          :key="item.slug"
        >
          <AnnouncementCard :announcement="item" />
        </li>
      </ul>
      <p
        v-else
        class="m-0 text-foreground-muted"
      >
        Aucune annonce pour le moment.
      </p>
    </IugmSection>
  </div>
</template>
