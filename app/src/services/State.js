import Ecogeste from "../models/Ecogeste";

class State {
    constructor () {
        this.ecogestes = {};
        fetch("data/ecogestes.json")
            .then(response => response.json())
            .then(this.loadEcogestes.bind(this));
    }

    loadEcogestes (ecogestes) {
        for (let key in ecogestes) {
            this.ecogestes[key] = new Ecogeste(ecogestes[key]);
        }
    }
}

export default new State();