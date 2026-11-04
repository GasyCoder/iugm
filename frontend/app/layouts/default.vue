<template>
  <div class="min-h-screen w-full bg-background">
    <a
      href="#contenu"
      class="sr-only z-60 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:text-primary-foreground"
    >Aller au contenu</a>
    <AppAnnouncementBar />
    <AppHeader />
    <main
      id="contenu"
      tabindex="-1"
      class="outline-none"
    >
      <slot />
    </main>
    <AppFooter />
    <AppScrollTop />
    <AppMobileTabBar />
    <!-- Réserve l'espace de la barre d'onglets mobile sous le footer. -->
    <div
      aria-hidden="true"
      class="h-(--tabbar-height) bg-iugm-blue-950"
    />
  </div>
</template>
