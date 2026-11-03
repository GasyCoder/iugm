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
  <!-- Pas de fiche formation publiée : carte informative, non cliquable. -->
  <article class="flex h-full flex-col gap-3 border-b border-border py-4 text-foreground sm:rounded sm:border sm:bg-surface sm:p-6">
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
      {{ program.title }}
    </h3>
    <p class="m-0 text-sm text-foreground-muted">
      {{ program.admission }}
    </p>
    <IugmPendingTag
      v-if="program.status === 'pending'"
      label="NIVEAU À CONFIRMER PAR L’IUGM"
      class="sm:hidden"
    />
    <div class="hidden items-center border-t border-sand-200 pt-3 sm:flex">
      <IugmPendingTag :label="program.status === 'pending' ? 'NIVEAU À CONFIRMER PAR L’IUGM' : 'BROCHURE IUGM · À CONFIRMER'" />
    </div>
  </article>
</template>
