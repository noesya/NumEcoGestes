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
      chrome.storage.local.get("months", function (data) {
        const monthsData = data.months || {},
          monthData = monthsData[monthDataKey] || { score: 0 }
        this.score = monthData.score
      }.bind(this))
    },

    getBadgeIcon (badge) {
      return (this.score < badge.points) ? badge.largeIcon.unchecked : badge.largeIcon.checked;
    },

    getBadgeStyle (badge) {
      const percentage = Math.floor(badge.points / 10)
      return `left: ${percentage}%;`;
    },

    getProgressStyle () {
      return `width: ${this.progressValue}%;`
    }
  },

  mounted() {
    this.updateData();
    setInterval(this.updateData.bind(this), 1000);
  }
}
</script>

<template>
  <p class="fr-text--sm fr-mt-5v fr-mb-2v">Mon score détaillé</p>

  <div class="levels">
    <div :class="{ level: true, 'level--unchecked': (score < badge.points) }" v-for="badge in badges" :style="getBadgeStyle(badge)">
      <img :src="getBadgeIcon(badge)" alt="Badge {{ badge.label }}" />
      <p class="fr-h6"><strong>{{ badge.label }}</strong></p>
      <p>{{ badge.points }}</p>
    </div>
  </div>

  <div class="progress">
    <div class="progress-bar" :style="getProgressStyle()"></div>
  </div>
</template>

<style scoped>
.fr-grid-row {
  justify-content: space-between;
}

.levels {
  height: 250px;
  position: relative;
}

.level {
  bottom: 0;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
}
.level p {
  margin-bottom: 0;
}

.level--unchecked p {
  color: var(--text-disabled-grey);
}

.level::after {
  content: '';
  width: 1px;
  height: 40px;
  display: block;
  background: var(--grey-200-850);
  margin: 0.5rem auto;
}

.level--unchecked::after {
  background: var(--grey-950-150);
}

progress {
  height: 2rem;
  width: 100%;
}

.progress {
  padding: 3px;
  border-radius: 20px;
  background: #E3E3FD;
  border: 1px solid #6A6AF4;
}

.progress-bar {
  height: 18px;
  border-radius: 20px;
  width: 20%;
  background-color: #6A6AF4;
}
</style>