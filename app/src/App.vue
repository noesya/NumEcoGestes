<script>
import { RouterLink, RouterView } from "vue-router"
import OnboardingSetup from "./components/OnboardingSetup.vue"
import state from "./services/State";

export default {
  components: { RouterLink, RouterView, OnboardingSetup },

  computed: {
    quickLinks () {
      return this.onboarded ? [
        {
          label: 'Accueil',
          path: '/',
          icon: 'ri-home-4-line'
        },
        {
          label: 'Menu',
          path: '/menu',
          icon: 'ri-apps-2-line'
        }
      ] : [];
    }
  },

  data() {
    return {
      onboardStatusLoaded: false,
      onboarded: false,
      state: state
    }
  },

  methods: {
    updateState () {
      const date = new Date(),
            monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      chrome.storage.local.get("months", function (data) {
        const monthsData = data.months || {},
        monthData = monthsData[monthDataKey] || { score: 0 }
        this.state.score = monthData.score
      }.bind(this));
    }
  },

  mounted() {
    chrome.storage.local.get('onboarding', function (data) {
      this.onboarded = data.onboarding && data.onboarding.success;
      this.onboardStatusLoaded = true;
    }.bind(this));

    this.updateState();
    setInterval(this.updateState.bind(this), 1000);
  }
}

</script>

<template>
  <DsfrHeader
      :quick-links="quickLinks"
      home-to="/"
      service-title="NumÉcoGestes"
      service-description="Outil pour la sobriété énergétique proposé par la MiNumEco, la mission interministérielle numérique écoresponsable"
      />
  <div v-if="onboardStatusLoaded" class="fr-container">
    <div v-if="!onboarded">
      <OnboardingSetup />
    </div>
    <div v-if="onboarded">
      <RouterView />
    </div>
  </div>
</template>
