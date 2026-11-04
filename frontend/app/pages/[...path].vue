<script setup lang="ts">
// Toute adresse inconnue rejoint la page d'erreur par le même chemin qu'une fiche inconnue.
throw createError({ statusCode: 404, statusMessage: 'Page introuvable', fatal: true })
</script>

<template>
  <div />
</template>
