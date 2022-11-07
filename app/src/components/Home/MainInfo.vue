<script>
import badge1Url from '@/assets/images/badges/badge1.png' // => or relative path

export default {
  data () {
    return {
      badge1Url: badge1Url,
      day: "",
      date: "1 janv.",
      hours: "00",
      minutes: "00",
      score: 0
    }
  },

  methods: {
    updateData () {
      const date = new Date()
      const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
      const monthNames = ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."]
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      this.day = dayNames[date.getDay()]
      this.date = `${date.getDate()} ${monthNames[date.getMonth()]}`
      this.hours = date.getHours().toString().padStart(2, 0)
      this.minutes = date.getMinutes().toString().padStart(2, 0)
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
  <div class="fr-grid-row main-infos">
    <div class="fr-col">
      <p class="fr-mb-0 main-infos__label">{{ day }}</p>
      <p class="main-infos__value">{{ date }}</p>
    </div>
    <div class="fr-col">
      <p class="fr-mb-0 main-infos__label">Heure</p>
      <p class="main-infos__value">{{ hours }}:{{ minutes }}</p>
    </div>
    <div class="fr-col">
      <p class="fr-mb-0 main-infos__label">Mon score</p>
      <p class="main-infos__value">{{ score }}</p>
    </div>
    <div class="fr-col">
      <p class="fr-mb-0">Mes badges</p>
      <div>
        <img :src="badge1Url" alt="Badge Novice" />
        <img :src="badge1Url" alt="Badge Novice" />
        <img :src="badge1Url" alt="Badge Novice" />
        <img :src="badge1Url" alt="Badge Novice" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-infos__value {
    font-size: 3rem;
    line-height: 3.5rem;
  }
</style>