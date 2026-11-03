<script setup lang="ts">
import { keyFigures } from '~/data/home'

const hasPending = keyFigures.some(figure => figure.status === 'pending')
</script>

<template>
  <IugmSection
    labelledby="figures-title"
    tone="surface"
    spacing="bottom"
  >
    <h2
      id="figures-title"
      class="sr-only"
    >
      Chiffres clés
    </h2>
    <dl
      v-reveal.fade
      class="m-0 grid grid-cols-2 border-t-2 border-primary-strong md:grid-cols-3 xl:grid-cols-6"
    >
      <div
        v-for="figure in keyFigures"
        :key="figure.label"
        class="flex flex-col gap-1 border-b border-border py-5 pr-4 xl:border-r xl:border-b-0 xl:pl-5 xl:first:pl-0 xl:last:border-r-0"
      >
        <dt class="order-2 text-sm font-semibold">
          {{ figure.label }}
        </dt>
        <dd class="order-1 m-0 text-figure font-bold text-primary-strong">
          {{ figure.value }}
        </dd>
        <dd class="order-3 m-0">
          <IugmPendingTag :label="figure.status === 'pending' ? '[À CONFIRMER]' : 'SOURCE : BROCHURE'" />
        </dd>
      </div>
    </dl>
    <IugmPendingTag
      v-if="hasPending"
      label="XX : VALEURS À CONFIRMER PAR L’IUGM — AUCUN CHIFFRE N’EST ESTIMÉ"
      class="mt-4 block"
    />
  </IugmSection>
</template>
