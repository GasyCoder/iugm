<script setup lang="ts">
import { admissions } from '~/data/home'
</script>

<template>
  <IugmSection
    id="admissions"
    labelledby="admissions-title"
    content-class="flex flex-col gap-10"
  >
    <div class="flex flex-wrap items-end justify-between gap-6">
      <IugmSectionHeading
        id="admissions-title"
        title="Comment rejoindre"
        highlight="l’IUGM"
        :description="admissions.summary"
      />
      <IugmArrowLink
        to="/admissions"
        variant="outline"
        size="default"
      >
        Conditions d’admission
      </IugmArrowLink>
    </div>

    <ol class="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
      <IugmStepCard
        v-for="(step, index) in admissions.steps"
        :key="step.title"
        :number="index + 1"
        :title="step.title"
        :description="step.description"
      />
    </ol>
  </IugmSection>
</template>
