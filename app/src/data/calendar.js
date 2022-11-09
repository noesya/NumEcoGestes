export default {
  dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  monthShortNames: ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."],

  getMonthKey: (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
  },

  getDateKey: (date) => {
    return `${this.getMonthKey(date)}-${date.getDate().toString().padStart(2, 0)}`
  }
}