window.ecogestes = {
    init: function () {
        this.gesteLabel = document.getElementById("ecogestes-geste-label");
        this.iDoBtn = document.getElementById("ecogestes-i-do-btn");
        this.nextBtn = document.getElementById("ecogestes-next-geste-btn");
        fetch("data/ecogestes.json")
            .then(response => response.json())
            .then(this.onEcogestesLoad.bind(this));
    },

    onEcogestesLoad: function (data) {
        this.ecogestes = data;
        this.initEvents();
        this.nextGeste();
    },

    initEvents: function () {
        console.log("initEvents");
    },

    nextGeste: function () {
        console.log("nextGeste");
    },

    invoke: function () {
        return {
            init: this.init.bind(this)
        };
    }
}.invoke();

window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    window.ecogestes.init();
});
