<script>
  import EcogesteCard from "../components/EcogesteCard.vue"
  export default {
    components: {
      EcogesteCard
    },

    data () {
      return {
        ecogestes: []
      }
    },
    mounted () {
      fetch("data/ecogestes.json").then(result => result.json()).then(function (data) {
        this.ecogestes = data;
      }.bind(this))
    }
  }
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu', to: '/menu'}, { text: 'Catalogue d\'écogestes' }]"
    />
  <main>
    <div class="fr-mb-4w" v-for="(ecogeste, key) in ecogestes">
      <EcogesteCard :ecogesteKey="key" :ecogeste="ecogeste" />
    </div>
  </main>
</template>
