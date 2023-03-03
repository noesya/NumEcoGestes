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
          unaffectedEcogestes: [],
          signals: [],
          currentFilter: "",
          filters: [
            { label: "Tous", value: "" },
            { label: "Je baisse", value: "je-baisse", icon: "ri-arrow-right-down-line" },
            { label: "J'éteins", value: "j-eteins", icon: "ri-shut-down-line" },
            { label: "Je décale", value: "je-decale", icon: "ri-arrow-right-line" },
          ]
        }
    },

    methods: {
      selectFilter (filter) {
        this.currentFilter = filter.value;
      },

      isAffected (ecogesteKey) {
        return this.unaffectedEcogestes.indexOf(ecogesteKey) === -1;
      },

      onAffectChange (ecogesteKey, isAffected) {
        chrome.storage.local.get("unaffectedEcogestes", function (data) {
          var ecogesteIndex;
          this.unaffectedEcogestes = Object.values(data.unaffectedEcogestes || {});
          ecogesteIndex = this.unaffectedEcogestes.indexOf(ecogesteKey);
          if (!isAffected && ecogesteIndex === -1) {
            this.unaffectedEcogestes.push(ecogesteKey);
          } else if (isAffected && ecogesteIndex !== -1) {
            this.unaffectedEcogestes.splice(ecogesteIndex, 1);
          }
          // Firefox needs to recreate an Array from Proxy because it can't do it automatically like Chrome
          chrome.storage.local.set({ unaffectedEcogestes: [...this.unaffectedEcogestes] });
        }.bind(this));
      },

      getEcogestes () {
        this.ecogestes = state.ecogestes;
        if (Object.keys(this.ecogestes).length === 0) {
          setTimeout(this.getEcogestes.bind(this), 100);
        } else {
          this.$forceUpdate();
        }
      }
    },

    mounted() {
      this.getEcogestes();
      chrome.storage.local.get("signals", function (data) {
        this.signals = data.signals.signals;
      }.bind(this));
      chrome.storage.local.get("unaffectedEcogestes", function (data) {
        this.unaffectedEcogestes = Object.values(data.unaffectedEcogestes || {});
      });
    }
}
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu', to: '/menu'}, { text: 'Liste d\'écogestes' }]"
    />
  <main>
    <ul class="fr-tags-group fr-mb-2w">
      <li v-for="filter in filters">
        <button class="fr-tag" :aria-pressed="currentFilter === filter.value" v-on:click="selectFilter(filter)">
          <VIcon class="fr-mr-1v" v-if="filter.icon" :name="filter.icon" :label="filter.label" :scale="0.8" />
          {{ filter.label }}
        </button>
      </li>
    </ul>

    <div v-for="(ecogeste, key) in ecogestes">
      <div class="fr-mb-4w" v-if="currentFilter === '' || currentFilter === ecogeste.tag">
        <EcogesteCard :ecogesteKey="key" :ecogeste="ecogeste" :multiplier="getMultiplier" :affectionToggle="true" />
      </div>
    </div>
  </main>
</template>
