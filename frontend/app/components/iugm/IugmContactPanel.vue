<script setup lang="ts">
import { contacts, institution } from '~/data/institution'

/** Coordonnées connues de l'IUGM. Non actionnables tant que non vérifiées (voir utils/contact.ts). */
withDefaults(defineProps<{
  /** Ajoute les coordonnées de la brochure « Formation à distance ». */
  distance?: boolean
}>(), {
  distance: false,
})

const hasPending = hasUnverified([
  ...contacts.mainPhones,
  contacts.email,
  ...contacts.regional.flatMap(campus => campus.phones),
  ...contacts.distance,
])
</script>

<template>
  <div class="flex flex-col gap-5 rounded border border-border bg-surface p-5 md:p-6">
    <h2 class="m-0 text-xl font-bold text-primary-strong">
      Contacter l’IUGM
    </h2>
    <IugmPendingTag
      v-if="hasPending"
      label="COORDONNÉES DES BROCHURES · À CONFIRMER PAR L’IUGM"
    />

    <div
      v-if="distance"
      class="flex flex-col gap-1 text-sm"
    >
      <h3 class="m-0 text-sm font-bold">
        Formation à distance
      </h3>
      <IugmContactLink
        v-for="point in contacts.distance"
        :key="point.target"
        :point="point"
        :show-pending="false"
        class="break-words"
      />
    </div>

    <div class="flex flex-col gap-1 text-sm">
      <h3 class="m-0 text-sm font-bold">
        {{ institution.mainCampus.name }}
      </h3>
      <IugmContactLink
        v-for="point in contacts.mainPhones"
        :key="point.target"
        :point="point"
        :show-pending="false"
      />
      <IugmContactLink
        :point="contacts.email"
        :show-pending="false"
        class="break-words"
      />
      <address class="mt-1 text-foreground-muted not-italic">
        {{ institution.address[1] }}
      </address>
    </div>

    <div
      v-for="campus in contacts.regional"
      :key="campus.name"
      class="flex flex-col gap-1 text-sm"
    >
      <h3 class="m-0 text-sm font-bold">
        {{ campus.name }}
      </h3>
      <IugmContactLink
        v-for="point in campus.phones"
        :key="point.target"
        :point="point"
        :show-pending="false"
      />
    </div>

    <p class="m-0 text-sm text-foreground-muted">
      Facebook · {{ institution.facebook.label }}
    </p>
  </div>
</template>
