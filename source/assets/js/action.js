window.addEventListener("DOMContentLoaded", function () {
    var debugNotificationBtn = document.getElementById('debug-notification-btn');
        debugBannerBtn = document.getElementById('debug-banner-btn');

    chrome.storage.local.get("signals").then(function (data) {
        var signalsList = document.getElementById("signals-list"),
            liNode;
        data.signals.signals.forEach(function (item) {
            liNode = document.createElement("li");
            liNode.innerText = `${new Date(item.jour).toLocaleString("fr-FR", { dateStyle: 'short' })} : ${item.message}`;
            signalsList.appendChild(liNode);
        });
    });

    debugNotificationBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage('', {
            type: 'ecogestes-debug-notification',
            delayInSeconds: parseInt(document.getElementById("delay-input").value)
        });
    });

    debugBannerBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage('', {
            type: 'ecogestes-debug-banner',
            delayInSeconds: parseInt(document.getElementById("delay-input").value)
        });
    });
})