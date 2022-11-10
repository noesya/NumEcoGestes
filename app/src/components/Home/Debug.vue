<script>
import sample from "../../data/sample"

export default {
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

    sendDelayedAlertNotification () {
      chrome.runtime.sendMessage('', {
        type: 'ecogestes-debug-alert-notification',
        delayInSeconds: 3
      });
    },

    sendDelayedDailyNotification () {
      chrome.runtime.sendMessage('', {
        type: 'ecogestes-debug-daily-notification',
        delayInSeconds: 3
      });
    }
  }
}
</script>

<template>
  <div class="fr-tile fr-tile--horizontal fr-mt-4w">
    <div class="fr-tile__body">
      <h4 class="fr-tile__title fr-mb-4w">Débogage</h4>
      <ul class="fr-btns-group fr-btns-group--inline-md">
        <li><button class="fr-btn" type="button" v-on:click="setInitialData">Initialiser les données</button></li>
        <li><button class="fr-btn" type="button" v-on:click="resetCurrentMonth">Réinitialiser le mois en cours</button></li>
        <li><button class="fr-btn" type="button" v-on:click="setTodayAlerts">Ajouter des alertes pour aujourd'hui</button></li>
      </ul>
      <ul class="fr-btns-group fr-btns-group--inline-md">
        <li><button class="fr-btn" type="button" v-on:click="sendDelayedAlertNotification">Notification d'alerte dans 3 secondes</button></li>
        <li><button class="fr-btn" type="button" v-on:click="sendDelayedDailyNotification">Notification quotidienne dans 3 secondes</button></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fr-tile {
  background: var(--yellow-tournesol-975-75);
  box-shadow: inset 0 0 0 1px var(--border-default-grey), inset 0-.25rem 0 0 var(--border-plain-yellow-tournesol);
}
</style>