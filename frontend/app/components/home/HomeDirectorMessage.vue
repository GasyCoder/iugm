<script setup lang="ts">
import { Quote } from '@lucide/vue'
import { directorMessage } from '~/data/home'
</script>

<template>
  <IugmSection
    id="direction"
    labelledby="direction-title"
    content-class="grid items-center gap-10 md:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16"
  >
    <div class="mx-auto w-full max-w-72 md:max-w-none">
      <img
        v-if="directorMessage.photo"
        :src="`${directorMessage.photo.base}-640.webp`"
        :srcset="`${directorMessage.photo.base}-320.webp 320w, ${directorMessage.photo.base}-640.webp 640w`"
        sizes="18rem"
        :alt="directorMessage.photo.alt"
        :width="directorMessage.photo.width"
        :height="directorMessage.photo.height"
        loading="lazy"
        decoding="async"
        class="aspect-300/340 w-full rounded-xl border object-cover object-top shadow-xs"
      >
      <IugmImagePlaceholder
        v-else
        subject="portrait du Directeur"
        class="aspect-300/340 w-full rounded-xl border"
      />
    </div>

    <figure class="m-0 flex flex-col gap-4">
      <IugmSectionHeading
        id="direction-title"
        title="Mot du"
        highlight="Directeur"
      />
      <Quote
        class="size-7 text-secondary"
        aria-hidden="true"
      />
      <blockquote
        v-if="directorMessage.quote"
        class="m-0 text-lg leading-relaxed text-pretty sm:text-xl"
      >
        {{ directorMessage.quote }}
      </blockquote>
      <p
        v-else
        class="m-0 text-lg leading-relaxed text-pretty text-foreground-muted"
      >
        Le message du Directeur de l’IUGM sera publié ici dès sa transmission par l’Institut.
      </p>
      <figcaption
        v-if="directorMessage.author"
        class="mt-4 flex items-center gap-4"
      >
        <span
          aria-hidden="true"
          class="h-px w-10 bg-primary"
        />
        <span class="flex flex-col">
          <strong class="font-semibold">{{ directorMessage.author }}</strong>
          <span class="text-sm text-foreground-muted">{{ directorMessage.role }}</span>
        </span>
      </figcaption>
    </figure>
  </IugmSection>
</template>
