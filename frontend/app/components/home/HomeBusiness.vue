<script setup lang="ts">
import { businessOffers, partnerSlotCount } from '~/data/home'
import { media } from '~/data/media'

const contact = { path: '/', hash: '#contact' }
</script>

<template>
  <IugmSection
    id="entreprises"
    labelledby="entreprises-title"
    tone="surface"
    content-class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20"
  >
    <figure class="m-0 flex flex-col gap-3">
      <IugmImagePlaceholder
        v-reveal.fade
        :subject="media.fairStand.alt"
        class="aspect-4/3 w-full rounded lg:aspect-auto lg:h-full lg:max-h-155"
      />
      <figcaption class="text-xs text-foreground-muted">
        Emplacement du visuel de l’équipe IUGM sur son stand ·
        <IugmPendingTag label="NOM DE L’ÉVÉNEMENT À CONFIRMER" />
      </figcaption>
    </figure>

    <div class="flex flex-col gap-6">
      <IugmSectionHeading
        id="entreprises-title"
        eyebrow="IUGM & Entreprises"
        title="Recrutez, accueillez, transmettez."
      />
      <p class="m-0 text-base leading-relaxed text-foreground-muted">
        Entreprises et institutions de la région peuvent travailler avec l’IUGM à chaque étape du parcours des étudiants.
      </p>
      <ul class="m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2 sm:gap-x-8">
        <li
          v-for="offer in businessOffers"
          :key="offer.title"
          class="flex flex-col gap-0.5 border-t border-border py-3.5"
        >
          <h3 class="m-0 text-base font-bold">
            {{ offer.title }}
          </h3>
          <p class="m-0 text-sm text-foreground-muted">
            {{ offer.description }}
          </p>
        </li>
      </ul>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Button as-child>
          <AppNavLink :to="contact">
            Devenir partenaire
          </AppNavLink>
        </Button>
        <Button
          as-child
          variant="outline"
        >
          <AppNavLink :to="contact">
            Proposer un stage
          </AppNavLink>
        </Button>
      </div>
      <div class="flex flex-col gap-2">
        <IugmPendingTag label="PARTENAIRES À CONFIRMER PAR L’IUGM" />
        <div
          aria-hidden="true"
          class="grid grid-cols-3 gap-2 sm:grid-cols-5"
        >
          <div
            v-for="slot in partnerSlotCount"
            :key="slot"
            class="flex h-14 items-center justify-center rounded border border-dashed border-sand-300 font-mono text-[11px] text-foreground-muted"
          >
            Logo
          </div>
        </div>
      </div>
    </div>
  </IugmSection>
</template>
