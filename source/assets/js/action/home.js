window.addEventListener("DOMContentLoaded", function () {
    'use strict';
    const updateHome = function () {
        var currentDayElt = document.getElementById('home-current-day'),
            currentDateElt = document.getElementById('home-current-date'),
            currentTimeElt = document.getElementById('home-current-time'),
            currentScoreElt = document.getElementById('home-current-score'),
            now = new Date(),
            monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}`,
            dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

        currentDayElt.textContent = dayNames[now.getDay()];
        currentDateElt.textContent = now.toLocaleDateString("fr-FR");
        currentTimeElt.textContent = now.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "numeric" });
        chrome.storage.local.get("months").then(function (data) {
            var currentScore;
            try {
                currentScore = data.months[monthKey].score;
            } catch {
                currentScore = 0;
            }
            currentScoreElt.textContent = currentScore;
        });
    }

    window.setInterval(updateHome, 1000);
    updateHome();
});