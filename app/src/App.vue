<script setup>
import { RouterLink, RouterView } from "vue-router"

const quickLinks = [
  {
    label: 'Accueil',
    path: '/index.html',
    icon: 'ri-home-4-line'
  },
  {
    label: 'Menu',
    path: '/menu',
    icon: 'ri-apps-2-line'
  }
]

</script>

<template>
  <DsfrHeader
      :quick-links="quickLinks"
      service-title="NumÉcoGestes"
      service-description="Une extension proposée par la mission interministérielle numérique écoresponsable"
      />
  <div class="fr-container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
