<script setup lang="ts">
import { businessOffers } from '~/data/home'

const contact = { path: '/', hash: '#contact' }
</script>

<template>
  <IugmSection
    id="entreprises"
    labelledby="entreprises-title"
    tone="muted"
    content-class="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
  >
    <div class="flex flex-col items-start gap-6">
      <IugmSectionHeading
        id="entreprises-title"
        title="Recrutez, accueillez,"
        highlight="transmettez."
        description="Entreprises et institutions de la région peuvent travailler avec l’IUGM à chaque étape du parcours des étudiants."
      />
      <div class="flex flex-col gap-3 self-stretch sm:flex-row sm:self-start">
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
    </div>

    <ul class="m-0 grid list-none gap-4 self-start p-0 sm:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="offer in businessOffers"
        :key="offer.title"
      >
        <Card
          size="sm"
          class="h-full"
        >
          <CardHeader>
            <CardTitle>
              <h3 class="m-0 text-base font-semibold">
                {{ offer.title }}
              </h3>
            </CardTitle>
            <CardDescription class="leading-relaxed">
              {{ offer.description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </li>
    </ul>
  </IugmSection>
</template>
