<script setup lang="ts">
import { contacts, institution } from '~/data/institution'

const props = defineProps<{
  group: 'main' | 'regional'
}>()

const points = computed(() => (props.group === 'main'
  ? [...contacts.mainPhones, contacts.email]
  : contacts.regional.flatMap(campus => campus.phones)))

const linkClass = 'text-white no-underline hover:text-iugm-green-300'
</script>

<template>
  <ul class="m-0 flex list-none flex-col gap-2.5 p-0 text-sm">
    <template v-if="group === 'main'">
      <li
        v-for="phone in contacts.mainPhones"
        :key="phone.target"
      >
        <IugmContactLink
          :point="phone"
          :show-pending="false"
          :class="linkClass"
          class="whitespace-nowrap"
        />
      </li>
      <li>
        <IugmContactLink
          :point="contacts.email"
          :show-pending="false"
          :class="linkClass"
        />
      </li>
      <li>
        <a
          v-if="institution.facebook.url"
          :href="institution.facebook.url"
          :class="linkClass"
        >Facebook · {{ institution.facebook.label }}</a>
        <span
          v-else
          class="text-iugm-blue-200"
        >Facebook · {{ institution.facebook.label }}</span>
      </li>
    </template>
    <template v-else>
      <li
        v-for="campus in contacts.regional"
        :key="campus.name"
      >
        <span class="text-iugm-blue-200">{{ campus.name }} · </span>
        <template
          v-for="(phone, index) in campus.phones"
          :key="phone.target"
        >
          <template v-if="index > 0">
            ,
          </template>
          <IugmContactLink
            :point="phone"
            :show-pending="false"
            :class="linkClass"
            class="whitespace-nowrap"
          />
        </template>
      </li>
    </template>
    <li v-if="hasUnverified(points)">
      <IugmPendingTag
        tone="dark"
        label="COORDONNÉES À CONFIRMER PAR L’IUGM"
      />
    </li>
  </ul>
</template>
