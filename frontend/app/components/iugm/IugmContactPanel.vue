<script setup lang="ts">
import { contacts, institution } from '~/data/institution'

/** Coordonnées connues de l'IUGM. Non actionnables tant que non vérifiées (voir utils/contact.ts). */
withDefaults(defineProps<{
  /** Ajoute les coordonnées de la brochure « Formation à distance ». */
  distance?: boolean
}>(), {
  distance: false,
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        <h2 class="m-0 text-xl font-semibold tracking-tight">
          Contacter l’IUGM
        </h2>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-5">
      <div
        v-if="distance"
        class="flex flex-col gap-1"
      >
        <h3 class="m-0 text-sm font-semibold">
          Formation à distance
        </h3>
        <IugmContactLink
          v-for="point in contacts.distance"
          :key="point.target"
          :point="point"
          class="break-words"
        />
      </div>

      <div class="flex flex-col gap-1">
        <h3 class="m-0 text-sm font-semibold">
          {{ institution.mainCampus.name }}
        </h3>
        <IugmContactLink
          v-for="point in contacts.mainPhones"
          :key="point.target"
          :point="point"
        />
        <IugmContactLink
          v-if="isPublishable(contacts.email)"
          :point="contacts.email"
          class="break-words"
        />
        <address class="mt-1 text-foreground-muted not-italic">
          {{ institution.address[1] }}
        </address>
      </div>

      <div
        v-for="campus in contacts.regional"
        :key="campus.name"
        class="flex flex-col gap-1"
      >
        <h3 class="m-0 text-sm font-semibold">
          {{ campus.name }}
        </h3>
        <IugmContactLink
          v-for="point in campus.phones"
          :key="point.target"
          :point="point"
        />
      </div>

      <p class="m-0 text-foreground-muted">
        Facebook · {{ institution.facebook.label }}
      </p>
    </CardContent>
  </Card>
</template>
