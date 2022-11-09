<script>
import badge1Url from '@/assets/images/badges/badge1.png' // => or relative path
import calendar from '../../data/calendar'

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
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      this.day = calendar.dayNames[date.getDay()]
      this.date = `${date.getDate()} ${calendar.monthShortNames[date.getMonth()]}`
      this.hours = date.getHours().toString().padStart(2, 0)
      this.minutes = date.getMinutes().toString().padStart(2, 0)
      chrome.storage.local.get("months").then(function (data) {
        const monthData = data.months[monthDataKey] || { score: 0 }
        this.score = monthData.score
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
    <div>
      <div>
        <p class="main-infos__label fr-mb-0 fr-text--sm">{{ day }}</p>
        <p class="main-infos__value">{{ date }}</p>
      </div>
    </div>
    <div class="sep"></div>
    <div>
      <div>
        <p class="main-infos__label fr-mb-0 fr-text--sm">Heure</p>
        <p class="main-infos__value">{{ hours }}:{{ minutes }}</p>
      </div>
    </div>
    <div class="sep"></div>
    <div>
      <div>
        <p class="main-infos__label fr-mb-0 fr-text--sm">Mon score</p>
        <p class="main-infos__value">{{ score }}</p>
      </div>
    </div>
    <div class="sep"></div>
    <div>
      <div>
        <p class="fr-mb-1w fr-text--sm">Mes badges</p>
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
</template>

<style scoped>

.main-infos {
  margin: var(--text-spacing);
}
.main-infos__value {
  font-size: 3rem;
  line-height: 3.5rem;
  margin-bottom: 0;
}

.img-badge {
  max-width: 20%;
}
.fr-grid-row {
  justify-content: space-between;
}
.fr-grid-row > div{
  /* padding: 0 50px; */
  /* border-right: 1px solid #000; */
}

.fr-grid-row > div:first-child{
  padding-left: 0;
}

.fr-grid-row > div:last-child{
  padding-right: 0;
  border-right: 0;
}

</style>