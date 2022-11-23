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
  <div class="fr-grid-row top-nav fr-my-2w">
    <div>
      <DsfrBreadcrumb :links="[{text: 'Menu', to: '/menu'}, {text: 'Accueil météo'}]" />
    </div>
    <div>
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

<style>
.top-nav {
  align-items: center;
  justify-content: space-between;
}
</style>