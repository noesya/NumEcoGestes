<script>
import { RouterLink, RouterView } from "vue-router"

export default {
  data() {
    return {
      quickLinks: [{
        label : "Créer un espace",
        to : "/",
        icon : "ri-add-circle-line"
      }]
    }
  }
}
</script>

<template>
  <DsfrHeader
      logo-text="NumÉcoGestes"
      service-title="Numecogestes"
      service-description="Une extension proposée par la mission interministérielle numérique écoresponsable"
      :quick-links="quickLinks"
      />
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div class="fr-container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
