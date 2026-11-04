<script setup lang="ts">
import type { FooterLink } from '~/types/navigation'
import { footerNavigation, legalLinks } from '~/data/navigation'
import { contacts, institution } from '~/data/institution'

const mainPhone = contacts.mainPhones[0]
const directContacts = mainPhone ? [mainPhone, contacts.email] : [contacts.email]

type FooterGroup
  = | { title: string, kind: 'links', links: FooterLink[] }
    | { title: string, kind: 'contacts', contacts: 'main' | 'regional' }

const groups: FooterGroup[] = [
  ...footerNavigation.map(group => ({ title: group.title, kind: 'links' as const, links: group.links })),
  { title: `Contact ${institution.mainCampus.name}`, kind: 'contacts', contacts: 'main' },
  { title: 'Sites régionaux', kind: 'contacts', contacts: 'regional' },
]
</script>

<template>
  <footer
    id="contact"
    class="w-full bg-iugm-blue-950 text-white focus-on-dark"
  >
    <h2 class="sr-only">
      Contact et informations
    </h2>
    <!-- Bloc identité sur toute la largeur ; colonnes : 2 jusqu'à xl, 4 à partir de xl (aucune colonne trop étroite). -->
    <div class="grid w-full grid-cols-1 gap-8 px-gutter pt-10 pb-8 md:grid-cols-2 md:gap-10 md:pt-14 xl:grid-cols-4">
      <div class="flex flex-col gap-5 md:col-span-2 md:flex-row md:items-start md:justify-between md:gap-10 xl:col-span-4">
        <div class="flex items-center gap-3">
          <IugmLogo
            :size="56"
            class="size-13 md:size-14"
          />
          <div class="flex flex-col">
            <span class="text-lg font-extrabold">{{ institution.acronym }}</span>
            <span class="text-xs text-iugm-blue-200">{{ institution.parent }}</span>
          </div>
        </div>

        <!-- Mobile : contact direct en tête (Fondations). Inactif tant que les coordonnées ne sont pas vérifiées. -->
        <div class="flex flex-col gap-2 md:hidden">
          <div
            class="grid gap-2.5"
            :class="hasUnverified(directContacts) ? 'grid-cols-1' : 'grid-cols-2'"
          >
            <IugmContactLink
              v-for="point in directContacts"
              :key="point.channel"
              :point="point"
              :label="point.channel === 'phone' ? 'Appeler' : 'Écrire'"
              :show-pending="false"
              class="flex h-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white no-underline hover:bg-white/15 hover:text-white"
              pending-class="cursor-default border border-dashed border-white/25 bg-transparent px-4 text-iugm-blue-100 hover:bg-transparent hover:text-iugm-blue-100"
            />
          </div>
          <IugmPendingTag
            v-if="hasUnverified(directContacts)"
            tone="dark"
            label="COORDONNÉES À CONFIRMER PAR L’IUGM"
          />
        </div>

        <address class="text-sm leading-relaxed text-iugm-blue-100 not-italic">
          <template
            v-for="(line, index) in institution.address"
            :key="line"
          >
            <br v-if="index > 0">{{ line }}
          </template>
        </address>
        <span class="hidden font-mono text-[11px] tracking-widest text-iugm-green-300 uppercase md:block">{{ institution.values }}</span>
      </div>

      <!-- Desktop / tablette : colonnes ouvertes (prototype v2). -->
      <nav
        v-for="group in groups"
        :key="group.title"
        :aria-label="group.title"
        class="hidden flex-col gap-3.5 md:flex"
      >
        <h3 class="m-0 text-xs font-semibold text-iugm-blue-200">
          {{ group.title }}
        </h3>
        <AppFooterLinks
          v-if="group.kind === 'links'"
          :links="group.links"
        />
        <AppFooterContacts
          v-else
          :group="group.contacts"
        />
      </nav>

      <!-- Mobile : groupes repliables. -->
      <Accordion
        type="multiple"
        class="md:hidden"
      >
        <AccordionItem
          v-for="group in groups"
          :key="group.title"
          :value="group.title"
          class="border-t border-white/15 not-last:border-b-0"
        >
          <AccordionTrigger class="h-13 items-center rounded-none py-0 text-base font-semibold text-white hover:no-underline">
            {{ group.title }}
            <template #icon>
              <span
                aria-hidden="true"
                class="ml-auto text-lg text-iugm-green-300 transition-transform duration-240 ease-out-soft group-aria-expanded/accordion-trigger:rotate-45"
              >+</span>
            </template>
          </AccordionTrigger>
          <AccordionContent class="pb-5">
            <AppFooterLinks
              v-if="group.kind === 'links'"
              :links="group.links"
            />
            <AppFooterContacts
              v-else
              :group="group.contacts"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <span class="font-mono text-[11px] tracking-widest text-iugm-green-300 uppercase md:hidden">{{ institution.values }}</span>
    </div>

    <div class="flex w-full flex-col gap-3 border-t border-white/15 px-gutter py-6 text-xs text-iugm-blue-200 md:flex-row md:justify-between">
      <span>© {{ institution.parent }} · {{ institution.acronym }}</span>
      <ul class="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
        <li
          v-for="link in legalLinks"
          :key="link.label"
        >
          {{ link.label }}
        </li>
      </ul>
    </div>
  </footer>
</template>
