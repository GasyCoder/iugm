<script setup lang="ts">
import { keyFigures } from '~/data/home'
</script>

<template>
  <Card class="self-start py-0">
    <h3 class="sr-only">
      Chiffres clés
    </h3>
    <dl class="m-0 grid grid-cols-2">
      <div
        v-for="(figure, index) in keyFigures"
        :key="figure.label"
        class="flex flex-col gap-1 p-5 sm:p-6"
        :class="[index % 2 === 1 ? 'border-l' : undefined, index > 1 ? 'border-t' : undefined]"
      >
        <dt class="order-2 text-sm text-foreground-muted">
          {{ figure.label }}
        </dt>
        <dd class="order-1 m-0 text-3xl font-semibold tracking-tight text-primary tabular-nums">
          {{ figure.value }}
        </dd>
      </div>
    </dl>
  </Card>
</template>
