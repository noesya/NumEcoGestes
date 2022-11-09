<script>
import badges from '../../data/badges'

export default {
  data () {
    return {
      badges: badges,
      months: {}
    }
  },

  methods: {
    getBadgeIcon (badge, score) {
      return (score < badge.points) ? badge.icon.unchecked : badge.icon.checked;
    }
  },

  mounted() {
    chrome.storage.local.get("months").then(function (data) {
      this.months = data.months;
    }.bind(this))
  }
}
</script>

<template>
  <p class="fr-text--sm fr-mt-5v">Mon historique</p>

  <div class="fr-card fr-card--horizontal" v-for="month in Object.values(months).reverse()">
    <div class="fr-card__body fr-p-4v">
      <div class="fr-grid-row">
        <div class="fr-col">
          <h3 class="fr-card__title fr-h2 fr-mb-1v">{{ month.label.month }}</h3>
          <p class="fr-text--lg fr-mb-0">{{ month.label.year }}</p>
        </div>
        <div class="fr-col">
          <p class="fr-text--sm fr-mb-1v">Score du mois</p>
          <p class="score fr-mb-0 fr-display-xs">{{ month.score }}</p>
        </div>
        <div class="fr-col">
          <p class="fr-text--sm fr-mb-1v">Alertes du mois</p>
          <div class="alerts">
            <div class="fr-alert fr-alert--warning">
              <p>{{ month.alerts.orange }}</p>
            </div>
            <div class="fr-alert fr-alert--error">
              <p>{{ month.alerts.red }}</p>
            </div>
          </div>
        </div>
        <div class="fr-col">
          <p class="fr-text--sm fr-mb-3v">Badges obtenus</p>
          <div>
            <img class="img-badge" :src="getBadgeIcon(badge, month.score)" alt="Badge {{ badge.label }}" v-for="badge in badges" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fr-card {
  border-radius: 6px;
}

.fr-display-xs {
  font-size: 3rem !important;
  line-height: 3.5rem !important;
}

.alerts {
  display: flex;
}

.fr-alert {
  margin-right: 0.5rem;
  margin-top: 0;
  padding-right: 1.25rem;
}

.fr-alert--error:before {
  -webkit-mask-image: url(../../icons/system/alarm-warning-fill.svg);
  mask-image: url(../../icons/system/alarm-warning-fill.svg);
}

.fr-alert--error {
  --border-plain-error: var(--red-marianne-425-625-hover);
  --background-flat-error: var(--red-marianne-425-625-hover);
}

.fr-alert--warning {
  --border-plain-warning: #F69051;
  --background-flat-warning: #F69051;
}

.img-badge {
  max-width: 20%;
}
</style>
