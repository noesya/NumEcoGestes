<script>
import sample from "../../data/sample"

export default {
  data () {
    return {
      delayInSeconds: 0
    }
  },

  methods: {
    setInitialData () {
      chrome.storage.local.set({ months: sample.initialData });
    },
    resetCurrentMonth () {
      chrome.storage.local.get("months").then(function (data) {
        const now = new Date(),
          monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`;

        let monthsData = data.months;
        delete monthsData[monthKey];
        chrome.storage.local.set({ months: monthsData })
      })
    },

    setTodayAlerts () {
      chrome.storage.local.get("signals").then(function (data) {
        const now = new Date(),
          isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;

        let signalsData = data.signals;

        const targetIndex = signalsData.signals.findIndex(item => {
          return item.jour.indexOf(isoDate) !== -1;
        });

        if (targetIndex !== -1) {
          signalsData.signals[targetIndex].values = sample.ecowattValues;
          chrome.storage.local.set({ signals: signalsData });
        }
      });
    },

    sendDelayedNotification () {
      chrome.runtime.sendMessage('', {
        type: 'ecogestes-debug-notification',
        delayInSeconds: this.delayInSeconds
      });
    }
  }
}
</script>

<template>
  <div class="debug-section">
    <h2 class="fr-mt-2w fr-mb-1v">Débogage</h2>
    <button class="fr-btn fr-btn--secondary fr-my-2w fr-mr-1w" type="button" v-on:click="setInitialData">Initialiser les données</button>
    <button class="fr-btn fr-btn--secondary fr-my-2w fr-mr-1w" type="button" v-on:click="resetCurrentMonth">Réinitialiser le mois en cours</button>
    <button class="fr-btn fr-btn--secondary fr-my-2w" type="button" v-on:click="setTodayAlerts">Ajouter des alertes pour aujourd'hui</button>
    <label class="fr-label" for="delay-input">Délai (en secondes)</label>
    <input class="fr-input fr-mb-2w" type="number" min="0" step="1" v-model="delayInSeconds">
    <button class="fr-btn" type="button" v-on:click="sendDelayedNotification">Notification</button>
  </div>
</template>

<style scoped>
.debug-section {
  display: none;
}
</style>