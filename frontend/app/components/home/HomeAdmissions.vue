<script setup lang="ts">
import { admissions } from '~/data/home'
</script>

<template>
  <IugmSection
    id="admissions"
    labelledby="admissions-title"
    spacing="bottom"
  >
    <div
      v-reveal
      class="grid grid-cols-1 gap-8 rounded-md bg-primary-strong p-6 text-white focus-on-dark md:p-10 lg:grid-cols-[1fr_2.2fr]"
    >
      <div class="flex flex-col gap-2">
        <IugmEyebrow tone="dark">
          Admissions
        </IugmEyebrow>
        <h2
          id="admissions-title"
          class="m-0 text-xl font-bold md:text-2xl"
        >
          Comment rejoindre l’IUGM
        </h2>
        <p class="m-0 text-sm text-iugm-blue-100">
          {{ admissions.summary }}
        </p>
        <IugmPendingTag
          tone="dark"
          label="PROCÉDURE INDICATIVE · À CONFIRMER PAR L’IUGM"
          class="mt-1"
        />
        <AppNavLink
          :to="{ path: '/', hash: '#contact' }"
          class="mt-2 text-[15px] font-semibold text-white hover:text-iugm-green-300"
        >
          Contacter l’IUGM <span aria-hidden="true">→</span>
        </AppNavLink>
      </div>

      <ol class="m-0 grid list-none grid-cols-1 gap-px bg-white/15 p-0 md:grid-cols-3">
        <li
          v-for="(step, index) in admissions.steps"
          :key="step.title"
          class="flex flex-col gap-1.5 bg-primary-strong py-4 md:px-6 md:py-1"
        >
          <span
            aria-hidden="true"
            class="text-2xl font-bold text-iugm-green-300"
          >{{ index + 1 }}</span>
          <h3 class="m-0 text-base font-bold">
            {{ step.title }}
          </h3>
          <p
            class="m-0 text-sm"
            :class="step.status === 'pending' ? 'font-mono text-xs text-pending-on-dark' : 'text-iugm-blue-100'"
          >
            {{ step.description }}
            <template v-if="step.status === 'pending'">
              [À CONFIRMER PAR L’IUGM]
            </template>
          </p>
        </li>
      </ol>
    </div>
  </IugmSection>
</template>
