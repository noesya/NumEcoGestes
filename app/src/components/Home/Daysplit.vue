<script>
import calendar from '../../data/calendar';

export default {
  data () {
    return {
      values: []
    }
  },

  computed: {
    orangeAlertsCount: function () {
      return this.values.filter(function (value) {
        return value.hvalue === 2;
      }).length;
    },

    redAlertsCount: function () {
      return this.values.filter(function (value) {
        return value.hvalue === 3;
      }).length;
    },
  },

  methods: {
    getClassName(hour, hvalue) {
      var className = "daysplit__item__square"
      if (hvalue === 3) {
        className += " daysplit__item__square--red"
      } else if (hvalue === 2) {
        className += " daysplit__item__square--orange"
      } else if (8 <= hour && hour < 13 || 18 <= hour && hour < 20) {
        className += " daysplit__item__square--dark"
      }
      return className;
    },

    updateStorageAlertsCount () {
      chrome.storage.local.get("months").then(function (data) {
        var now = new Date(),
            monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`,
            dayKey = `${monthKey}-${now.getDate().toString().padStart(2, 0)}`;

        var monthsData = data.months || {};

        monthsData[monthKey] = monthsData[monthKey] || {
          label: {
            month: calendar.monthNames[now.getMonth()],
            year: now.getFullYear().toString()
          },
          score: 0,
          alerts: { red: 0, orange: 0 },
          days: {}
        }

        monthsData[monthKey].days[dayKey] = monthsData[monthKey].days[dayKey] || {
          alerts: { red: 0, orange: 0 },
          ecogestes: {},
          score: 0
        };

        monthsData[monthKey].days[dayKey].alerts.orange = this.orangeAlertsCount;
        monthsData[monthKey].days[dayKey].alerts.red = this.redAlertsCount;

        monthsData[monthKey].alerts.red = Object.values(monthsData[monthKey].days).reduce((a, b) => a + b.alerts.red, 0);
        monthsData[monthKey].alerts.orange = Object.values(monthsData[monthKey].days).reduce((a, b) => a + b.alerts.orange, 0);

        chrome.storage.local.set({ months: monthsData });
      }.bind(this));
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
        this.updateStorageAlertsCount();
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
      <div :class="getClassName(value.pas, value.hvalue)"></div>
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

.fr-alert--error:before {
  -webkit-mask-image: url(../../icons/system/alarm-warning-fill.svg);
  mask-image: url(../../icons/system/alarm-warning-fill.svg);
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
