<script setup lang="ts">
import { pedagogySteps } from '~/data/home'
</script>

<template>
  <IugmSection
    id="pedagogie"
    labelledby="peda-title"
    tone="night"
    content-class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20"
  >
    <div class="flex flex-col gap-6">
      <IugmSectionHeading
        id="peda-title"
        eyebrow="Pédagogie"
        title="Une pédagogie tournée vers l’action."
        tone="dark"
      />
      <IugmImagePlaceholder
        v-reveal.fade
        subject="étudiants en atelier projet"
        tone="dark"
        class="aspect-video rounded lg:aspect-auto lg:min-h-90 lg:flex-1"
      />
    </div>

    <ol class="m-0 flex list-none flex-col justify-end p-0">
      <li
        v-for="(step, index) in pedagogySteps"
        :key="step.number"
        v-reveal="index * 80"
        class="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-1 border-t border-white/15 py-5 md:grid-cols-[3rem_1fr_1.2fr] md:items-baseline md:gap-5"
      >
        <span
          aria-hidden="true"
          class="font-mono text-xs text-iugm-green-300"
        >{{ step.number }}</span>
        <h3 class="m-0 text-xl font-bold">
          {{ step.verb }}
        </h3>
        <p class="col-start-2 m-0 text-[15px] leading-relaxed text-iugm-blue-100 md:col-start-auto">
          {{ step.description }}
        </p>
      </li>
    </ol>
  </IugmSection>
</template>
