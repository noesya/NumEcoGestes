const getEcowattData = function () {
    fetch("https://ecoresponsable.numerique.gouv.fr/api/ecowatt/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    });
};

const initScore = function () {
    var currentDate = new Date(),
        year = currentDate.getFullYear(),
        month = currentDate.getMonth(),
        scoresData = {};

    scoresData[year] = {};
    scoresData[year][month] = 0;

    chrome.storage.local.set({ scores: scoresData });
};

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "ecogestes-ecowatt-data") {
        getEcowattData();
    }
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("ecogestes-ecowatt-data", { periodInMinutes: 60 });
    getEcowattData();
    initScore();
});

(chrome.action || chrome.browserAction).onClicked.addListener(() => {
    chrome.tabs.create({ url: "index.html" });
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    if (notificationId === "ECOGESTES_DEBUG_NOTIF") {
        chrome.notifications.clear("ECOGESTES_DEBUG_NOTIF");
        chrome.tabs.create({ url: "index.html" });
    }
});

chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'ecogestes-debug-notification') {
        setTimeout(function () {
            chrome.notifications.create('ECOGESTES_DEBUG_NOTIF', {
                title: 'Écogestes - Débogage',
                message: 'Ceci est une notification de débogage.',
                iconUrl: '/icon.png',
                type: 'basic'
            });
        }, 1000 * data.delayInSeconds);
    }
});
