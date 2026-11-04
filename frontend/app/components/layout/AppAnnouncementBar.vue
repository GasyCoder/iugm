<script setup lang="ts">
import { Mail, Phone } from '@lucide/vue'
import { contacts, institution } from '~/data/institution'

const points = [...contacts.mainPhones.slice(0, 1), contacts.email].filter(isPublishable)
</script>

<template>
  <div class="bg-iugm-blue-900 text-[13px] text-iugm-blue-100 focus-on-dark max-lg:hidden">
    <div class="page-container flex h-10 items-center gap-4">
      <p class="m-0 min-w-0 flex-1 truncate">
        {{ institution.name }}, {{ institution.parent }}
      </p>
      <div class="flex shrink-0 items-center gap-5 border-l border-white/15 pl-5">
        <span
          v-for="point in points"
          :key="point.target"
          class="inline-flex items-center gap-1.5"
        >
          <component
            :is="point.channel === 'phone' ? Phone : Mail"
            class="size-3.5 text-iugm-green-300"
            aria-hidden="true"
          />
          <IugmContactLink
            :point="point"
            class="text-iugm-blue-100 no-underline hover:text-white"
          />
        </span>
      </div>
    </div>
  </div>
</template>
