<script>
import badge1Url from '@/assets/images/badges/badge1.png' // => or relative path

export default {
  data () {
    return {
      badge1Url: badge1Url,
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
  <p>Mon score détaillé</p>

  <div class="fr-grid-row">
    <div class="fr-col">
      <img :src="badge1Url" alt="Badge Novice" />
      <p><strong>Novice</strong></p>
      <p>200</p>
    </div>
    <div class="fr-col">
      <img :src="badge1Url" alt="Badge Initié·e" />
      <p><strong>Initié·e</strong></p>
      <p>400</p>
    </div>
    <div class="fr-col">
      <img :src="badge1Url" alt="Badge Confirmé·e" />
      <p><strong>Confirmé·e</strong></p>
      <p>600</p>
    </div>
    <div class="fr-col">
      <img :src="badge1Url" alt="Badge Expert·e" />
      <p><strong>Expert·e</strong></p>
      <p>800</p>
    </div>
    <div class="fr-col">
      <img :src="badge1Url" alt="Badge Maître" />
      <p><strong>Maître</strong></p>
      <p>950</p>
    </div>
  </div>
  <progress max="100" :value="progressValue"></progress>
</template>

<style scoped>
  .fr-col {
    text-align: center;
  }

  progress {
    height: 2rem;
    width: 100%;
  }
</style>