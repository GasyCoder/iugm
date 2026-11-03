<script setup lang="ts">
const route = useRoute()
const overlay = computed(() => route.meta.headerOverlay === true)
</script>

<template>
  <div class="min-h-screen w-full bg-background">
    <a
      href="#contenu"
      class="sr-only z-50 rounded-full bg-white px-5 py-3 font-semibold text-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >Aller au contenu</a>
    <AppHeader :overlay="overlay" />
    <main
      id="contenu"
      tabindex="-1"
      class="outline-none"
      :class="overlay ? undefined : 'pt-(--header-height)'"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
