<script>
import { RouterLink, RouterView } from "vue-router"
import OnboardingSetup from "./components/OnboardingSetup.vue"
import state from "./services/State";

export default {
  components: { RouterLink, RouterView, OnboardingSetup },

  computed: {
    quickLinks () {
      var links = []

      if (!this.onboarded) {
        return links;
      }

      if (this.$route.name !== 'home') {
        links.push({
          label: 'Accueil',
          path: '/',
          icon: 'ri-home-4-line',
          onClick: () => {
            if (this.$refs.header.modalOpened) {
              this.$refs.header.hideModal();
            }
          }
        });
      }

      if (this.$route.name !== 'menu') {
        links.push({
          label: 'Menu',
          path: '/menu',
          icon: 'ri-apps-2-line',
          onClick: () => {
            if (this.$refs.header.modalOpened) {
              this.$refs.header.hideModal();
            }
          }
        });
      }

      return links;
    }
  },

  data() {
    return {
      monthEndModalOpened: false,
      monthEndModalActions: [
        { label: "J'ai compris", onClick: this.onMonthEndModalClose, iconRight: true },
        { label: "Suivre mon activité", secondary: true, onClick: this.onMonthEndModalActivity }
      ],
      onboardStatusLoaded: false,
      onboarded: false,
      state: state
    }
  },

  methods: {
    updateState () {
      const date = new Date(),
            monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`,
            isoDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;

      chrome.storage.local.get("months", function (data) {
        const monthsData = data.months || {},
        monthData = monthsData[monthDataKey] || { score: 0 }
        this.state.score = monthData.score
      }.bind(this));

      chrome.storage.local.get("signals", function (data) {
        const currentDay = data.signals.signals.find(item => {
          return item.jour.indexOf(isoDate) !== -1;
        });

        if (!currentDay) {
          this.state.currentHValue = 1;
          return;
        }

        const currentValue = currentDay.values.find(function (value) {
          return value.pas === date.getHours();
        });

        this.state.currentHValue = currentValue.hvalue;
      }.bind(this));
    },

    openMonthEndModalIfNeeded () {
      const date = new Date(),
            daysForModal = 5,
            monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`;

      var nextMonth,
          daysUntilNextMonth;

      if (date.getMonth() == 11) {
        nextMonth = new Date(date.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      }

      daysUntilNextMonth = Math.ceil((nextMonth.getTime() - date.getTime()) / (1000 * 3600 * 24));

      chrome.storage.local.get("months", function (data) {
        data.months[monthDataKey] = data.months[monthDataKey] || {
          label: {
            month: calendar.monthNames[now.getMonth()],
            year: now.getFullYear().toString()
          },
          score: 0,
          alerts: { red: 0, orange: 0 },
          days: {}
        };

        if (!data.months[monthDataKey].monthEndModalSent) {
          data.months[monthDataKey]['monthEndModalSent'] = daysUntilNextMonth <= daysForModal;
          chrome.storage.local.set({ months: data.months });
          this.monthEndModalOpened = daysUntilNextMonth <= daysForModal;
        }
      }.bind(this));
    },

    onMonthEndModalClose () {
      this.monthEndModalOpened = false;
    },

    onMonthEndModalActivity () {
      this.onMonthEndModalClose();
      this.$router.push('/suivi');
    }
  },

  watch: {
    "state.currentHValue": function (value) {
      let iconPath;
      switch (value) {
        case 3:
          iconPath = "/icon-red.png";
          break;
        case 2:
          iconPath = "/icon-orange.png";
          break;
        default:
          iconPath = "/icon.png";
          break;
      }
      document.querySelector('link[rel="icon"]').href = iconPath;
      (chrome.action || chrome.browserAction).setIcon({
        path: iconPath
      });
    }
  },

  mounted() {
    chrome.storage.local.get('onboarding', function (data) {
      this.onboarded = data.onboarding && data.onboarding.success;
      this.onboardStatusLoaded = true;
    }.bind(this));

    this.openMonthEndModalIfNeeded();

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
      ref="header"
      />
  <div v-if="onboardStatusLoaded" class="fr-container">
    <div v-if="!onboarded">
      <OnboardingSetup />
    </div>
    <div v-if="onboarded">
      <RouterView />

      <DsfrModal ref="modal" :opened="monthEndModalOpened" :actions="monthEndModalActions" :origin="$refs.modalOrigin"
        @close="onMonthEndModalClose()">
        <h1 class="fr-modal__title">Score et badges</h1>
        <p>Le mois est bientôt terminé, ce qui signifie que votre score et les badges obtenus seront remis à zéro (le 1er du mois à venir).</p>
        <p>Pas d’inquiétude ! Vos scores et les badges obtenus chaque mois sont sauvegardés et consultables sur la page “Suivi d’activité”, accessible depuis le menu de l’extension ou via le bouton ci-dessous.</p>
      </DsfrModal>
    </div>
  </div>
</template>
