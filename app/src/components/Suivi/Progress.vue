<script>
import badge1Url from '@/assets/images/badges/badge1.png' // => or relative path

export default {
  data () {
    return {
      badge1Url: badge1Url,
      score: 0
    }
  },

  methods: {
    updateData () {
      const date = new Date()
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      chrome.storage.local.get("months").then(function (data) {
        this.score = data.months[monthDataKey].score
      }.bind(this))
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
    <div class="level">
      <img :src="badge1Url" alt="Badge Novice" />
      <p class="fr-h6"><strong>Novice</strong></p>
      <p>200</p>
    </div>
    <div class="level">
      <img :src="badge1Url" alt="Badge Initié·e" />
      <p class="fr-h6"><strong>Initié·e</strong></p>
      <p>400</p>
    </div>
    <div class="level">
      <img :src="badge1Url" alt="Badge Confirmé·e" />
      <p class="fr-h6"><strong>Confirmé·e</strong></p>
      <p>600</p>
    </div>
    <div class="level">
      <img :src="badge1Url" alt="Badge Expert·e" />
      <p class="fr-h6"><strong>Expert·e</strong></p>
      <p>800</p>
    </div>
    <div class="level">
      <img :src="badge1Url" alt="Badge Maître" />
      <p class="fr-h6"><strong>Maître</strong></p>
      <p>950</p>
    </div>
  </div>
  <progress max="100" :value="score"></progress>
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