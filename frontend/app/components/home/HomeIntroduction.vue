<script setup lang="ts">
import { manifesto, pillars } from '~/data/home'
import { institution } from '~/data/institution'
</script>

<template>
  <IugmSection
    id="institut"
    labelledby="intro-title"
  >
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="flex flex-col items-start gap-5">
        <IugmSectionHeading
          id="intro-title"
          title="L’IUGM"
          highlight="en bref"
        />
        <p class="m-0 leading-relaxed text-pretty">
          {{ manifesto.quote }}
        </p>
        <p class="m-0 flex items-center gap-3 text-sm text-foreground-muted">
          <IugmLogo
            :size="36"
            plain
            class="size-9"
          />
          <span>
            Devise de l’Institut&#8239;:
            <em class="font-medium text-baobab not-italic">{{ institution.motto }}</em>
          </span>
        </p>
        <IugmArrowLink
          to="/formations"
          variant="outline"
          size="default"
        >
          Accéder aux formations
        </IugmArrowLink>
      </div>

      <HomeKeyFigures />
    </div>

    <ol class="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
      <IugmStepCard
        v-for="(pillar, index) in pillars"
        :key="pillar.number"
        v-reveal="index * 90"
        :number="index + 1"
        :title="pillar.title"
        :description="pillar.description"
      />
    </ol>
  </IugmSection>
</template>
