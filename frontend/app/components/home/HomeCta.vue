<script setup lang="ts">
import { Mail, MapPin, Phone } from '@lucide/vue'
import { contacts, institution } from '~/data/institution'

const mainPhone = contacts.mainPhones[0]
const chipClass = 'grid size-8 shrink-0 place-items-center rounded-md'
</script>

<template>
  <IugmSection
    labelledby="cta-title"
    tone="muted"
    content-class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
  >
    <div class="flex flex-col gap-6">
      <IugmSectionHeading
        id="cta-contact-title"
        title="Nous contacter"
        description="Une question sur une formation ou une admission ? Contactez l’Institut."
      />
      <ul class="m-0 flex list-none flex-col gap-4 p-0">
        <li class="flex items-start gap-3">
          <span
            :class="chipClass"
            class="bg-iugm-blue-100 text-primary"
          >
            <MapPin
              class="size-4"
              aria-hidden="true"
            />
          </span>
          <div class="flex min-w-0 flex-col gap-0.5 text-sm">
            <span class="text-xs text-foreground-muted">Adresse</span>
            <address class="font-medium not-italic">
              {{ institution.address[1] }}, {{ institution.address[2] }}
            </address>
          </div>
        </li>
        <li
          v-if="mainPhone"
          class="flex items-start gap-3"
        >
          <span
            :class="chipClass"
            class="bg-iugm-green-100 text-iugm-green-800"
          >
            <Phone
              class="size-4"
              aria-hidden="true"
            />
          </span>
          <div class="flex min-w-0 flex-col gap-0.5 text-sm">
            <span class="text-xs text-foreground-muted">Téléphone</span>
            <IugmContactLink
              :point="mainPhone"
              class="font-medium"
            />
          </div>
        </li>
        <li
          v-if="isPublishable(contacts.email)"
          class="flex items-start gap-3"
        >
          <span
            :class="chipClass"
            class="bg-warning-surface text-warning"
          >
            <Mail
              class="size-4"
              aria-hidden="true"
            />
          </span>
          <div class="flex min-w-0 flex-col gap-0.5 text-sm">
            <span class="text-xs text-foreground-muted">Email</span>
            <IugmContactLink
              :point="contacts.email"
              class="font-medium break-words"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl bg-primary p-7 text-primary-foreground shadow-xl focus-on-dark sm:p-10">
      <IugmConcentricCircles />
      <h2
        id="cta-title"
        class="m-0 max-w-md text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        Votre avenir professionnel commence ici.
      </h2>
      <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <IugmArrowLink
          to="/formations"
          variant="light"
        >
          Découvrir les formations
        </IugmArrowLink>
        <Button
          as-child
          size="lg"
          variant="outlineLight"
        >
          <AppNavLink to="/admissions">
            Comment candidater
          </AppNavLink>
        </Button>
      </div>
    </div>
  </IugmSection>
</template>
