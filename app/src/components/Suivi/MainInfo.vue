<script>
import calendar from '../../data/calendar'
import ShareWidget from '../ShareWidget.vue'
import state from '../../services/State'

export default {
  components: { ShareWidget },
  data () {
    return {
      day: "",
      date: "1 janv.",
      hours: "00",
      minutes: "00",
      state: state,
      score: 0
    }
  },

  methods: {
    updateData () {
      const date = new Date()
      this.day = calendar.dayNames[date.getDay()]
      this.date = `${date.getDate()} ${calendar.monthShortNames[date.getMonth()]}`
      this.hours = date.getHours().toString().padStart(2, 0)
      this.minutes = date.getMinutes().toString().padStart(2, 0)
    },
  },

  mounted() {
    this.window = window;
    this.updateData();
    setInterval(this.updateData.bind(this), 1000);
  }
}
</script>

<template>
  <div class="main-infos">
    <p class="main-infos__label fr-mb-0 fr-text--sm">Mon score</p>
    <p class="main-infos__value">{{ state.score }}</p>
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

.actions {
  margin-left: auto;
}
</style>