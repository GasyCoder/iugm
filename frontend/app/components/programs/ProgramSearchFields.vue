<script setup lang="ts">
import type { ProgramDomain, ProgramLevel } from '~/types/program'
import { programDomainLabels, programLevelLabels } from '~/data/programs'

/** Champs de recherche de formation (mot-clé, niveau, domaine), à placer dans une grille à deux colonnes sur mobile. */
defineProps<{
  idPrefix: string
  levels: ProgramLevel[]
  domains: ProgramDomain[]
}>()

const keyword = defineModel<string>('keyword', { required: true })
const level = defineModel<ProgramLevel | null>('level', { required: true })
const domain = defineModel<ProgramDomain | null>('domain', { required: true })

// Un SelectItem ne peut pas avoir de valeur vide : « all » représente l'absence de filtre.
const ALL = 'all'
const levelValue = computed({
  get: () => level.value ?? ALL,
  set: (value) => {
    level.value = value === ALL ? null : value as ProgramLevel
  },
})
const domainValue = computed({
  get: () => domain.value ?? ALL,
  set: (value) => {
    domain.value = value === ALL ? null : value as ProgramDomain
  },
})
</script>

<template>
  <Field class="col-span-2 gap-2 lg:col-span-1">
    <FieldLabel :for="`${idPrefix}-keyword`">
      Mot-clé
    </FieldLabel>
    <Input
      :id="`${idPrefix}-keyword`"
      v-model="keyword"
      type="search"
      enterkeyhint="search"
      autocomplete="off"
      placeholder="Finance, marketing, RH…"
    />
  </Field>

  <Field class="min-w-0 gap-2">
    <FieldLabel :for="`${idPrefix}-level`">
      Niveau
    </FieldLabel>
    <Select v-model="levelValue">
      <SelectTrigger
        :id="`${idPrefix}-level`"
        class="w-full"
      >
        <SelectValue>{{ level ? programLevelLabels[level] : 'Tous niveaux' }}</SelectValue>
      </SelectTrigger>
      <SelectContent
        position="popper"
        :body-lock="false"
        class="z-60"
      >
        <SelectItem :value="ALL">
          Tous niveaux
        </SelectItem>
        <SelectItem
          v-for="value in levels"
          :key="value"
          :value="value"
        >
          {{ programLevelLabels[value] }}
        </SelectItem>
      </SelectContent>
    </Select>
  </Field>

  <Field class="min-w-0 gap-2">
    <FieldLabel :for="`${idPrefix}-domain`">
      Domaine
    </FieldLabel>
    <Select v-model="domainValue">
      <SelectTrigger
        :id="`${idPrefix}-domain`"
        class="w-full"
      >
        <SelectValue>{{ domain ? programDomainLabels[domain] : 'Tous domaines' }}</SelectValue>
      </SelectTrigger>
      <SelectContent
        position="popper"
        :body-lock="false"
        class="z-60"
      >
        <SelectItem :value="ALL">
          Tous domaines
        </SelectItem>
        <SelectItem
          v-for="value in domains"
          :key="value"
          :value="value"
        >
          {{ programDomainLabels[value] }}
        </SelectItem>
      </SelectContent>
    </Select>
  </Field>
</template>
