import Ecogeste from "../models/Ecogeste";

class State {
  constructor() {
    this.days = [];
    this.setup();
  }
  setup() {
    this.ecogestesInstances = [];
    this.ecogestes.forEach((data) => {
      this.ecogestesInstances.push(new Ecogeste(data));
    })
  }
}

export default new State();