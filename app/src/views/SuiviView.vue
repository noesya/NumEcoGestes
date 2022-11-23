<script>
import ShareWidget from '../components/ShareWidget.vue'
import state from '../services/State'
import MainInfo from '../components/Suivi/MainInfo.vue'
import Progress from '../components/Suivi/Progress.vue'
import History from '../components/Suivi/History.vue'

export default {
  components: { ShareWidget, MainInfo, Progress, History },
  data () {
    return {
      state: state
    }
  }
}
</script>

<template>
  <div class="fr-grid-row top-nav fr-my-2w">
    <div>
      <DsfrBreadcrumb :links="[{ text: 'Menu', to: '/menu' }, { text: 'Suivi d\'activité' }]" />
    </div>
    <div>
      <ShareWidget :score="state.score" />
    </div>
  </div>

  <main>
    <MainInfo />
    <Progress />
    <History />
  </main>
</template>

<style>
.top-nav {
  align-items: center;
  justify-content: space-between;
}
</style>