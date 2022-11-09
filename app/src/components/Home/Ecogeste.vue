<script>
import EcogesteCard from '../EcogesteCard.vue';

export default {
  components: {
    EcogesteCard
  },

  data () {
    return {
      ecogestes: {},
      hasAnswered: false,
      hasNextEcogeste: false,
      suggestedKeys: [],
      currentKey: null,
      currentEcogeste: null
    }
  },

  computed: {
    getMultiplier: function () {
      const now = new Date(),
            hour = now.getHours(),
            isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;

      const highConsoMultiplier = (8 <= hour && hour < 13 || 18 <= hour && hour < 20) ? 1.5 : 1;

      const currentDay = this.signals.find(item => {
        return item.jour.indexOf(isoDate) !== -1;
      });

      if (!currentDay) {
        return highConsoMultiplier;
      }

      const currentValue = currentDay.values.find(function (value) {
        return value.pas === hour;
      });

      switch (currentValue.hvalue) {
        case 3:
          return highConsoMultiplier * 2;
        case 2:
          return highConsoMultiplier * 1.5;
          default:
          return highConsoMultiplier;
      }
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

    loadEcowattData: function () {
      chrome.storage.local.get("signals").then(function (data) {
        this.signals = data.signals.signals;
      }.bind(this));
    },

    nextEcogeste: function () {
      chrome.storage.local.get('months').then(function (data) {
        var now = new Date(),
            monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`,
            dayKey = `${monthKey}-${now.getDate().toString().padStart(2, 0)}`,
            dayData,
            answeredKeys,
            availableKeys = [];

        data.months[monthKey] = data.months[monthKey] || { days: {} }

        dayData = data.months[monthKey].days[dayKey] || {
          alerts: { red: 0, orange: 0 },
          ecogestes: {},
          score: 0
        }

        answeredKeys = Object.keys(dayData.ecogestes);
        this.hasNextEcogeste = answeredKeys.length < this.ecogestesKeys.length - 1;

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

        this.hasAnswered = false;
      }.bind(this));
    },

    answerEcogeste: function () {
      chrome.storage.local.get('months').then(function (data) {
        var now = new Date(),
            monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`,
            dayKey = `${monthKey}-${now.getDate().toString().padStart(2, 0)}`,
            monthNames = [
              "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
            ],
            multiplier = this.getMultiplier;

        data.months[monthKey] = data.months[monthKey] || {
          label: {
            month: monthNames[now.getMonth()],
            year: now.getFullYear().toString()
          },
          score: 0,
          alerts: { red: 0, orange: 0 },
          days: {}
        }

        data.months[monthKey].days[dayKey] = data.months[monthKey].days[dayKey] || {
          alerts: { red: 0, orange: 0 },
          ecogestes: {},
          score: 0
        };

        data.months[monthKey].days[dayKey].ecogestes[this.currentKey] = {
          raw: this.currentEcogeste.points,
          multiplier: multiplier,
          total: this.currentEcogeste.points * multiplier
        }

        data.months[monthKey].days[dayKey].score = Object.values(data.months[monthKey].days[dayKey].ecogestes).reduce((a, b) => a + b.total, 0);
        data.months[monthKey].score = Object.values(data.months[monthKey].days).reduce((a, b) => a + b.score, 0);

        chrome.storage.local.set({ months: data.months })

        this.hasAnswered = true;
      }.bind(this));
    }
  },

  mounted () {
    this.loadEcogestes()
    this.loadEcowattData()
  }
}
</script>

<template>
  <div v-if="currentEcogeste">
    <p class="fr-mb-1w fr-mt-8v fr-text--sm">Suggestion d'écogeste</p>

    <div class="fr-mb-4w">
      <EcogesteCard :ecogesteKey="currentKey" :ecogeste="currentEcogeste" :buttons="true" :answered="hasAnswered" :has-next="hasNextEcogeste" />
    </div>
  </div>
</template>