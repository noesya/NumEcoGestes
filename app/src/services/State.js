import Ecogeste from "../models/Ecogeste";

class State {
    constructor () {
        this.ecogestes = {};
        this.score = 0;
        this.currentHValue = 1;
        fetch("data/ecogestes.json")
            .then(response => response.json())
            .then(this.loadEcogestes.bind(this));
        chrome.storage.local.get("unaffectedEcogestes", function (data) {
            this.unaffectedEcogestes = Object.values(data.unaffectedEcogestes) || [];
            for (let key in this.ecogestes) {
                this.ecogestes[key].affected = this.unaffectedEcogestes.indexOf(key) === -1;
            }
        }.bind(this));
    }

    loadEcogestes (ecogestes) {
        for (let key in ecogestes) {
            this.ecogestes[key] = new Ecogeste(ecogestes[key]);
        }
    }
}

export default new State();