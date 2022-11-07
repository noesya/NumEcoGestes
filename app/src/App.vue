<script setup>
import { RouterLink, RouterView } from "vue-router"

const quickLinks = [{
    label: 'Notifications',
    path: '/',
    icon: 'ri-notification-3-line',
    iconOnly: true,
    button: true
  },
  {
    label: 'À propos',
    path: '/'
  },
  {
    label: 'DSFR',
    href: 'https://systeme-de-design.gouv.fr/',
}]

const navItems = [
  {
    path: '/',
    text: 'Accueil',
  },
  {
    path: '/',
    text: 'À propos',
  },
]
</script>

<template>
  <DsfrHeader
      :quick-links="quickLinks"
      logo-text="NumÉcoGestes"
      service-title="Numecogestes"
      service-description="Une extension proposée par la mission interministérielle numérique écoresponsable"
      />
      <DsfrBreadcrumb
        :links="[{text: 'Accueil', to: '/'}, {text: 'Test fil d’Ariane'}]"
      />
  <header>
    <div class="wrapper">
      <DsfrNavigation
        :nav-items="navItems"
      />
    </div>
  </header>

  <div class="fr-container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
