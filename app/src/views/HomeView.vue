<script>
import ShareWidget from '../components/ShareWidget.vue'
import state from '../services/State'
import MainInfo from '../components/Home/MainInfo.vue'
import Daysplit from '../components/Home/Daysplit.vue'
import Ecogeste from '../components/Home/Ecogeste.vue'
import Debug from '../components/Home/Debug.vue'

export default {
  components: { ShareWidget, MainInfo, Daysplit, Ecogeste, Debug },
  data() {
    return {
      state: state
    }
  }
}
</script>

<template>
  <div class="fr-grid-row">
    <div class="fr-col">
      <DsfrBreadcrumb :links="[{text: 'Menu', to: '/menu'}, {text: 'Accueil météo'}]" />
    </div>
    <div class="fr-col fr-pt-2w">
      <ShareWidget :score="state.score" />
    </div>
  </div>

  <main>
    <MainInfo />
    <Daysplit />
    <Ecogeste />
    <Debug />
  </main>
</template>
