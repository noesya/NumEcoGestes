<script>
import badges from '../../data/badges'

export default {
  data () {
    return {
      badges: badges,
      score: 0
    }
  },

  computed: {
    progressValue () {
      return Math.min(100, Math.floor(this.score / 10));
    }
  },

  methods: {
    updateData () {
      const date = new Date()
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      chrome.storage.local.get("months").then(function (data) {
        const monthsData = data.months || {},
              monthData = monthsData[monthDataKey] || { score: 0 }
        this.score = monthData.score
      }.bind(this))
    },

    getBadgeIcon (badge) {
      return (this.score < badge.points) ? badge.icon.unchecked : badge.icon.checked;
    }
  },

  mounted() {
    this.updateData();
    setInterval(this.updateData.bind(this), 1000);
  }
}
</script>

<template>
  <p class="fr-text--sm">Mon score détaillé</p>

  <div class="fr-grid-row">
    <div class="level" v-for="badge in badges">
      <img :src="getBadgeIcon(badge)" alt="Badge {{ badge.label }}" />
      <p class="fr-h6"><strong>{{ badge.label }}</strong></p>
      <p>{{ badge.points }}</p>
    </div>
  </div>
  <progress max="100" :value="progressValue"></progress>
</template>

<style scoped>
.fr-grid-row {
  justify-content: space-between;
}

.level {
  text-align: center;
}
.level p {
  margin-bottom: 0;
}

.level::after {
  content: '';
  width: 1px;
  height: 40px;
  display: block;
  background: var(--grey-200-850);
  margin: 0.5rem auto;
}

progress {
  height: 2rem;
  width: 100%;
}
</style>