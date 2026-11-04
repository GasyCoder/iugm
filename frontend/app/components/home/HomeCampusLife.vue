<script setup lang="ts">
import { MapPin } from '@lucide/vue'
import { institution } from '~/data/institution'

const sites = [institution.mainCampus, ...institution.regionalCampuses].map(campus => campus.name)
</script>

<template>
  <IugmSection
    id="vie-iugm"
    labelledby="vie-title"
    content-class="flex flex-col gap-8"
  >
    <IugmSectionHeading
      id="vie-title"
      title="L’IUGM est présent sur"
      :highlight="`${sites.length} sites.`"
    />

    <ul
      v-reveal.fade
      class="m-0 grid list-none gap-4 p-0 sm:grid-cols-3"
    >
      <li
        v-for="site in sites"
        :key="site"
      >
        <Card class="h-full bg-primary text-primary-foreground ring-0">
          <CardContent class="flex items-center gap-3">
            <MapPin
              class="size-5 shrink-0 text-iugm-green-300"
              aria-hidden="true"
            />
            <span class="text-base font-semibold">{{ site }}</span>
          </CardContent>
        </Card>
      </li>
    </ul>
  </IugmSection>
</template>
