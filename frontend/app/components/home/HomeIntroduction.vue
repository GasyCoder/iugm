<script setup lang="ts">
import { manifesto, pillars } from '~/data/home'
import { institution } from '~/data/institution'
</script>

<template>
  <IugmSection
    id="institut"
    labelledby="intro-title"
    tone="surface"
    spacing="top"
    content-class="grid grid-cols-1 gap-10 pb-16 md:pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
  >
    <div
      v-reveal
      class="flex flex-col gap-6"
    >
      <IugmEyebrow
        id="intro-title"
        as="h2"
      >
        L’IUGM en bref
      </IugmEyebrow>
      <p class="m-0 font-serif text-quote text-pretty text-primary-strong italic">
        {{ manifesto.quote }}
      </p>
      <p class="m-0 flex items-center gap-3 text-sm text-foreground-muted">
        <IugmLogo
          :size="36"
          plain
          class="size-9"
        />
        Devise de l’Institut&#8239;:
        <em class="font-serif text-lg text-baobab">{{ institution.motto }}</em>
      </p>
    </div>

    <ol class="m-0 flex list-none flex-col p-0">
      <li
        v-for="(pillar, index) in pillars"
        :key="pillar.number"
        v-reveal="index * 90"
        class="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border py-5 last:border-b"
      >
        <span
          aria-hidden="true"
          class="pt-1 font-mono text-xs text-accent-text"
        >{{ pillar.number }}</span>
        <div class="flex flex-col gap-1">
          <h3 class="m-0 text-lg font-bold lg:text-xl">
            {{ pillar.title }}
          </h3>
          <p class="m-0 text-[15px] leading-relaxed text-foreground-muted">
            {{ pillar.description }}
          </p>
        </div>
      </li>
    </ol>
  </IugmSection>
</template>
