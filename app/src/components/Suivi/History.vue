<script>
import badge1Url from '@/assets/images/badges/badge1.png' // => or relative path

export default {
  data () {
    return {
      badge1Url: badge1Url,
      months: {}
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
  <p>Mon historique</p>

  <div class="fr-card fr-card--horizontal" v-for="month in months">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <div class="fr-grid-row">
          <div class="fr-col">
            <h3 class="fr-card__title">{{ month.label.month }}</h3>
            <p class="fr-card__desc">{{ month.label.year }}</p>
          </div>
          <div class="fr-col">
            <p>Score du mois</p>
            <p class="score">{{ month.score }}</p>
          </div>
          <div class="fr-col">
            <p>Alertes du mois</p>
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
            <p>Badges obtenus</p>
            <div>
              <img class="img-badge" :src="badge1Url" alt="Badge Novice" />
              <img class="img-badge" :src="badge1Url" alt="Badge Initié·e" />
              <img class="img-badge" :src="badge1Url" alt="Badge Confirmé·e" />
              <img class="img-badge" :src="badge1Url" alt="Badge Expert·e" />
              <img class="img-badge" :src="badge1Url" alt="Badge Maître" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score {
  font-size: 2rem;
  margin-bottom: 0;
}

.alerts {
  display: flex;
}

.fr-alert {
  margin-right: 0.5rem;
  margin-top: 0;
  padding-right: 1.25rem;
}

.img-badge {
  max-width: 20%;
}
</style>
