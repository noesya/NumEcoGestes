const getEcowattData = function () {
    fetch("https://ecoresponsable.numerique.gouv.fr/api/ecowatt/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    });
};

const initData = function () {
    var currentDate = new Date(),
        monthKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, 0)}`,
        dayKey = `${monthKey}-${currentDate.getDate().toString().padStart(2, 0)}`,
        monthsData = {},
        monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

    monthsData[monthKey] = {
        label: {
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear().toString()
        },
        score: 0,
        alerts: { red: 0, orange: 0 },
        days: {}
    };
    monthsData[monthKey]["days"][dayKey] = {
        alerts: { red: 0, orange: 0 },
        ecogestes: {},
        score: 0
    }

    chrome.storage.local.set({ months: monthsData });
};

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "ecogestes-ecowatt-data") {
        getEcowattData();
    }
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("ecogestes-ecowatt-data", { periodInMinutes: 60 });
    getEcowattData();
    initData();
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
