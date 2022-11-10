<script>
import EcogesteCard from "../components/EcogesteCard.vue"
import state from "../services/State";

export default {
    components: {
        EcogesteCard
    },

    data () {
        return {
          ecogestes: state.ecogestes
        }
    }
}
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu', to: '/menu'}, { text: 'Liste d\'écogestes' }]"
    />
  <main>
    <div class="fr-mb-4w" v-for="(ecogeste, key) in ecogestes">
      <EcogesteCard :ecogesteKey="key" :ecogeste="ecogeste" :credit="true" />
    </div>
  </main>
</template>
