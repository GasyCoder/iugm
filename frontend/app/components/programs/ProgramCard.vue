<script setup lang="ts">
import type { Program, ProgramDomain } from '~/types/program'
import { ArrowRight } from '@lucide/vue'
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
  <Card class="group relative h-full gap-3 transition-shadow duration-150 ease-out-soft hover:shadow-md">
    <CardHeader class="grid-cols-[1fr_auto] items-center gap-3">
      <span class="flex items-center gap-2 text-[13px] font-medium text-foreground-muted">
        <span
          aria-hidden="true"
          class="size-2 rounded-full"
          :class="domainDot[program.domain]"
        />
        {{ programDomainLabels[program.domain] }}
      </span>
      <Badge variant="accent">
        {{ programLevelLabels[program.level] }}
      </Badge>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col gap-2">
      <h3 class="m-0 flex-1 text-base leading-snug font-semibold text-balance">
        <!-- Lien étendu à toute la carte (after:inset-0). -->
        <NuxtLink
          :to="`/formations/${program.slug}`"
          class="text-foreground no-underline after:absolute after:inset-0 after:rounded-xl group-hover:text-primary hover:text-primary"
        >
          {{ program.title }}
        </NuxtLink>
      </h3>
      <p class="m-0 text-sm text-foreground-muted">
        {{ program.admission }}
      </p>
    </CardContent>
    <CardFooter class="justify-end">
      <ArrowRight
        class="size-4 shrink-0 text-primary transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </CardFooter>
  </Card>
</template>
