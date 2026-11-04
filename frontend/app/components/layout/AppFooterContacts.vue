<script setup lang="ts">
import { contacts, institution } from '~/data/institution'

defineProps<{
  group: 'main' | 'regional'
}>()

const linkClass = 'break-words text-white no-underline hover:text-iugm-blue-100'
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
          :class="linkClass"
          class="whitespace-nowrap"
        />
      </li>
      <li v-if="isPublishable(contacts.email)">
        <IugmContactLink
          :point="contacts.email"
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
            :class="linkClass"
            class="whitespace-nowrap"
          />
        </template>
      </li>
    </template>
  </ul>
</template>
