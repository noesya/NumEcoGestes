window.addEventListener("DOMContentLoaded", function () {
    'use strict';
    const updateHome = function () {
        var currentDateElt = document.getElementById('home-current-date'),
            currentTimeElt = document.getElementById('home-current-time'),
            currentScoreElt = document.getElementById('home-current-score'),
            now = new Date();

        currentDateElt.textContent = now.toLocaleDateString("fr-FR");
        currentTimeElt.textContent = now.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "numeric" });
        chrome.storage.local.get("scores").then(function (data) {
            var currentScore;
            try {
                currentScore = data.scores[now.getFullYear()][now.getMonth()];
            } catch {
                currentScore = 0;
            }
            currentScoreElt.textContent = currentScore;
        });
    }

    window.setInterval(updateHome, 1000);
    updateHome();
});