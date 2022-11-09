<script>
import calendar from '../../data/calendar'

export default {
  data () {
    return {
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
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      this.day = calendar.dayNames[date.getDay()]
      this.date = `${date.getDate()} ${calendar.monthShortNames[date.getMonth()]}`
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
    <div class="fr-mr-4v">
      <p class="main-infos__label fr-mb-0 fr-text--sm">{{ day }}</p>
      <p class="main-infos__value">{{ date }}</p>
    </div>
    <div class="sep"></div>
    <div class="fr-ml-4v">
      <p class="main-infos__label fr-mb-0 fr-text--sm">Heure</p>
      <p class="main-infos__value">{{ hours }}:{{ minutes }}</p>
    </div>
    <div class="score">
      <p class="main-infos__label fr-mb-0 fr-text--sm">Mon score</p>
      <p class="main-infos__value">{{ score }}</p>
    </div>
  </div>
</template>

<style scoped>
.main-infos__value {
  font-size: 3rem;
  line-height: 3.5rem;
  margin-bottom: 0;
}
.main-infos {
  justify-content: start
}

.score {
  margin-left: auto;
}

</style>