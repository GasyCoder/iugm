<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/** En-tête des pages internes : bandeau gris clair, fil d'Ariane et titre. */
defineProps<{
  eyebrow?: string
  title: string
  /** Fil d'Ariane ; la dernière entrée, sans lien, est la page en cours. */
  crumbs?: { label: string, to?: RouteLocationRaw }[]
}>()
</script>

<template>
  <section class="w-full border-b bg-surface-muted">
    <div class="page-container flex flex-col gap-3 py-10 lg:py-14">
      <Breadcrumb v-if="crumbs">
        <BreadcrumbList class="m-0 list-none p-0">
          <template
            v-for="(crumb, index) in crumbs"
            :key="crumb.label"
          >
            <BreadcrumbSeparator v-if="index > 0" />
            <BreadcrumbItem>
              <BreadcrumbLink
                v-if="crumb.to"
                as-child
              >
                <NuxtLink
                  :to="crumb.to"
                  class="text-foreground-muted no-underline"
                >
                  {{ crumb.label }}
                </NuxtLink>
              </BreadcrumbLink>
              <BreadcrumbPage v-else>
                {{ crumb.label }}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
      <IugmEyebrow v-if="eyebrow">
        {{ eyebrow }}
      </IugmEyebrow>
      <h1 class="m-0 max-w-4xl text-3xl font-semibold tracking-tight text-balance break-words sm:text-4xl">
        {{ title }}
      </h1>
      <slot />
    </div>
  </section>
</template>
