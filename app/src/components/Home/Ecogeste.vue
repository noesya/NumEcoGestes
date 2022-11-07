<script>
import EcogesteCard from '../EcogesteCard.vue';

export default {
  components: {
    EcogesteCard
  },

  data () {
    return {
      ecogestes: {},
      suggestedKeys: [],
      currentKey: null,
      currentEcogeste: null
    }
  },

  methods: {
    loadEcogestes: function () {
      fetch("data/ecogestes.json").then(result => result.json()).then(function (data) {
        this.ecogestes = data;
        this.ecogestesKeys = Object.keys(this.ecogestes);
        this.nextEcogeste();
      }.bind(this))
    },

    nextEcogeste: function () {
      chrome.storage.local.get('months').then(function (data) {
        var now = new Date(),
            monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`,
            dayKey = `${monthKey}-${now.getDate().toString().padStart(2, 0)}`,
            dayData,
            answeredKeys,
            availableKeys = [];

        dayData = data.months[monthKey].days[dayKey] || {
          alerts: { red: 0, orange: 0 },
          ecogestes: {},
          score: 0
        }

        answeredKeys = Object.keys(dayData.ecogestes);

        for (const key of this.ecogestesKeys) {
          if (answeredKeys.indexOf(key) === -1 && this.suggestedKeys.indexOf(key) === -1 && key !== this.currentKey) {
            availableKeys.push(key);
          }
        }

        if (availableKeys.length > 0) {
          this.currentKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
          this.suggestedKeys.push(this.currentKey);
          this.currentEcogeste = this.ecogestes[this.currentKey];
        } else if (this.suggestedKeys.length > 0) {
          this.suggestedKeys = [];
          this.nextEcogeste();
        } else {
          this.currentKey = null;
          this.currentEcogeste = null;
        }
      }.bind(this));
    }
  },

  mounted () {
    this.loadEcogestes()
  }
}
</script>

<template>
  <p class="fr-mb-1w">Suggestion d'écogeste</p>

  <div class="fr-mb-4w">
    <EcogesteCard :ecogesteKey="currentKey" :ecogeste="currentEcogeste" :buttons="true" />
  </div>
</template>