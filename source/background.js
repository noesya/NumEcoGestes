const getData = function () {
    fetch("https://raw.githubusercontent.com/noesya/ecogestes-mirror/main/file/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    });
};

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "ecogestes-data") {
        getData();
    }
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("ecogestes-data", { periodInMinutes: 60 });
    getData();
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
    } else if (data.type === 'ecogestes-debug-banner') {
        setTimeout(function () {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'ecogestes-debug-banner-display'
                });
            });
        }, 1000 * data.delayInSeconds);
    } else if (data.type === 'ecogestes-send-close-banner') {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'ecogestes-close-banner'
            });
        });
    } else if (data.type === 'ecogestes-send-open-from-banner') {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'ecogestes-close-banner'
            });
            setTimeout(function () {
                chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
            }, 50);
        });
    }
});