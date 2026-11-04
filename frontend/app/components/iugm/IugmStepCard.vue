<script setup lang="ts">
/** Carte d'étape numérotée : pastille, intitulé, description. */
defineProps<{
  number: number
  title: string
  description: string
}>()
</script>

<template>
  <li>
    <Card class="h-full">
      <CardHeader class="gap-3">
        <span
          aria-hidden="true"
          class="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
        >{{ number }}</span>
        <CardTitle>
          <h3 class="m-0 text-base font-semibold">
            {{ title }}
          </h3>
        </CardTitle>
        <CardDescription class="leading-relaxed">
          {{ description }}
        </CardDescription>
      </CardHeader>
    </Card>
  </li>
</template>
