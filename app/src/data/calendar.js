export default {
  days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  months: ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."],
  getCurrentDate: () => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
  }
}