<script setup lang="ts">
import { contacts } from '~/data/institution'

const mainPhone = contacts.mainPhones[0]
const ctaContacts = mainPhone ? [mainPhone, contacts.email] : [contacts.email]
</script>

<template>
  <section
    aria-labelledby="cta-title"
    class="relative isolate w-full overflow-hidden bg-primary text-white focus-on-dark"
  >
    <IugmConcentricCircles />
    <div class="flex w-full flex-col gap-6 px-gutter py-16 md:py-24">
      <h2
        id="cta-title"
        v-reveal
        class="m-0 max-w-4xl text-h1 font-bold text-balance"
      >
        Votre avenir professionnel commence ici.
      </h2>
      <div class="flex flex-col gap-3 sm:flex-row">
        <IugmArrowLink to="/formations">
          Découvrir les formations
        </IugmArrowLink>
        <Button
          as-child
          variant="outlineLight"
          class="border-white"
        >
          <AppNavLink to="/admissions">
            Comment candidater
          </AppNavLink>
        </Button>
      </div>
      <p
        v-if="mainPhone"
        class="m-0 text-sm text-iugm-blue-100"
      >
        Une question&#8239;? Appelez le
        <IugmContactLink
          :point="mainPhone"
          :show-pending="false"
          class="text-white hover:text-iugm-green-300"
        />
        ou écrivez à
        <IugmContactLink
          :point="contacts.email"
          :show-pending="false"
          class="text-white hover:text-iugm-green-300"
        />.
        <IugmPendingTag
          v-if="hasUnverified(ctaContacts)"
          tone="dark"
          label="COORDONNÉES À CONFIRMER PAR L’IUGM"
          class="mt-1 block"
        />
      </p>
    </div>
  </section>
</template>
