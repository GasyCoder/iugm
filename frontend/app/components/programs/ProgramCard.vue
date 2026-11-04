<script setup lang="ts">
import type { Program, ProgramDomain } from '~/types/program'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

defineProps<{
  program: Program
}>()

const domainDot: Record<ProgramDomain, string> = {
  gestion: 'bg-domain-gestion',
  commerce: 'bg-domain-commerce',
  marketing: 'bg-domain-commerce',
  economie: 'bg-domain-economie',
  finances: 'bg-domain-finances',
  management: 'bg-domain-management',
}
</script>

<template>
  <article class="relative flex h-full flex-col gap-3 border-b border-border py-4 text-foreground transition duration-150 ease-out-soft sm:rounded sm:border sm:bg-surface sm:p-6 sm:hover:border-iugm-blue-300 sm:hover:shadow-card-hover">
    <div class="flex items-center justify-between gap-3">
      <span class="flex items-center gap-2 text-[13px] font-semibold text-foreground-muted">
        <span
          aria-hidden="true"
          class="size-2 rounded-full"
          :class="domainDot[program.domain]"
        />
        {{ programDomainLabels[program.domain] }}
      </span>
      <span class="rounded-sm bg-surface-muted px-2 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
        {{ programLevelLabels[program.level] }}
      </span>
    </div>
    <h3 class="m-0 flex-1 text-lg leading-snug font-bold text-balance">
      <!-- Lien étendu à toute la carte (after:inset-0). -->
      <NuxtLink
        :to="`/formations/${program.slug}`"
        class="text-foreground no-underline after:absolute after:inset-0 hover:text-primary"
      >
        {{ program.title }}
      </NuxtLink>
    </h3>
    <p class="m-0 text-sm text-foreground-muted">
      {{ program.admission }}
    </p>
    <IugmPendingTag
      v-if="program.status === 'pending'"
      label="NIVEAU À CONFIRMER PAR L’IUGM"
      class="sm:hidden"
    />
    <div class="flex items-center justify-between gap-3 sm:border-t sm:border-sand-200 sm:pt-3">
      <IugmPendingTag
        :label="program.status === 'pending' ? 'NIVEAU À CONFIRMER PAR L’IUGM' : 'BROCHURE IUGM · À CONFIRMER'"
        class="hidden sm:inline"
      />
      <span
        aria-hidden="true"
        class="shrink-0 text-sm font-semibold text-primary"
      >Fiche →</span>
    </div>
  </article>
</template>
