<script>
import EcogesteCard from "../components/EcogesteCard.vue"
import state from "../services/State";

export default {
    components: {
        EcogesteCard
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

    data () {
        return {
          ecogestes: state.ecogestes,
          signals: []
        }
    },

  mounted() {
      chrome.storage.local.get("signals").then(function (data) {
        this.signals = data.signals.signals;
      }.bind(this));
    }
}
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu', to: '/menu'}, { text: 'Liste d\'écogestes' }]"
    />
  <main>
    <div class="fr-mb-4w" v-for="(ecogeste, key) in ecogestes">
      <EcogesteCard :ecogesteKey="key" :ecogeste="ecogeste" :credit="true" :multiplier="getMultiplier" />
    </div>
  </main>
</template>
