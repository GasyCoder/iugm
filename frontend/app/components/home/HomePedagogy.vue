<script setup lang="ts">
import { pedagogySteps } from '~/data/home'
</script>

<template>
  <IugmSection
    id="pedagogie"
    labelledby="peda-title"
    tone="muted"
    content-class="flex flex-col gap-10"
  >
    <IugmSectionHeading
      id="peda-title"
      title="Une pédagogie tournée"
      highlight="vers l’action."
    />
    <ol class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
      <IugmStepCard
        v-for="(step, index) in pedagogySteps"
        :key="step.number"
        v-reveal="index * 80"
        :number="index + 1"
        :title="step.verb"
        :description="step.description"
      />
    </ol>
  </IugmSection>
</template>
