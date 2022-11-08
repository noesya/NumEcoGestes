<script>
export default {
  data () {
    console.log(state);
    return {
      values: []
    }
  },

  computed: {
    orangeAlertsCount: function () {
      return this.values.filter(function (value) {
        value.hval === 2;
      }).length;
    },

    redAlertsCount: function () {
      return this.values.filter(function (value) {
        value.hval === 3;
      }).length;
    },
  },

  methods: {
    getClassName(hour, hval) {
      var className = "daysplit__item__square"
      if (hval === 3) {
        className += " daysplit__item__square--red"
      } else if (hval === 2) {
        className += " daysplit__item__square--orange"
      } else if (8 <= hour && hour < 13 || 18 <= hour && hour < 20) {
        className += " daysplit__item__square--dark"
      }
      return className;
    }
  },

  mounted () {
    chrome.storage.local.get("signals").then(function (data) {
      const now = new Date(),
            isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;

      const currentDay = data.signals.signals.find(item => {
        return item.jour.indexOf(isoDate) !== -1;
      });

      if (currentDay) {
        this.values = currentDay.values;
      }
    }.bind(this));
  }
}
</script>

<template>
  <p>Alertes prévues aujourd'hui</p>

  <div class="fr-grid-row fr-grid-row--gutters fr-mb-1w">
    <div class="fr-col">
      <div class="fr-alert fr-alert--error">
        <div class="fr-alert__count">{{ redAlertsCount }}</div>
        <p>Alerte(s) rouge(s) : coupures inévitables si la consommation n’est pas réduite.</p>
      </div>
    </div>
    <div class="fr-col">
      <div class="fr-alert fr-alert--warning">
        <div class="fr-alert__count">{{ orangeAlertsCount }}</div>
        <p>Alerte(s) orange(s) : la réduction et le décalage des consommations d’énergie sont nécessaires.</p>
      </div>
    </div>
  </div>

  <div class="fr-grid-row daysplit">
    <div class="fr-col daysplit__item" v-for="value in values">
      <div :class="getClassName(value.pas, value.hval)"></div>
      <p v-if="value.pas % 2 === 0">{{ value.pas }}h</p>
    </div>
  </div>
  <div class="daysplit__legend">
    <div class="daysplit__legend__item">
      <span class="daysplit__legend__square daysplit__legend__square--high"></span>
      Forte consommation
    </div>
    <div class="legend__item">
      <span class="daysplit__legend__square daysplit__legend__square--regular"></span>
      Consommation normale
    </div>
  </div>
</template>

<style scoped>
.fr-alert--error {
  --border-plain-error: var(--red-marianne-425-625-hover);
  --background-flat-error: var(--red-marianne-425-625-hover);
}

.fr-alert--warning {
  --border-plain-warning: #F69051;
  --background-flat-warning: #F69051;
}

.fr-alert__count {
  bottom: 0;
  color: white;
  font-weight: bold;
  left: 0;
  margin: 0.5rem .5rem;
  position: absolute;
  text-align: center;
  width: 1.5rem;
  }

  .daysplit {
    margin: -0.05rem;
  }

  .daysplit__item {
    padding: 0 0.05rem;
  }

  .daysplit__item__square {
    background: var(--blue-france-850-200);
    height: 24px;
    width: 100%;
  }

  .daysplit__item__square--dark {
    background: var(--blue-france-main-525);
  }

  .daysplit__item__square--orange {
    background: #F69051;
  }

  .daysplit__item__square--red {
    background: var(--red-marianne-425-625-hover);
  }

  .daysplit__legend {
    display: flex;
    font-size: 0.85rem;
    margin: 0 -1rem 1rem;
  }

  .daysplit__legend__item {
    margin: 0 1rem;
  }

  .daysplit__legend__square {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    vertical-align: middle;
  }

  .daysplit__legend__square--regular {
    background: #CACAFB;
  }

  .daysplit__legend__square--high {
    background: #6A6AF4;
  }
</style>
