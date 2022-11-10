const getEcowattData = function () {
    fetch("https://ecoresponsable.numerique.gouv.fr/api/ecowatt/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    });
};

const sendDailyNotification = function () {
    chrome.notifications.create('ECOGESTES_DAILY_NOTIF', {
        title: "NumEcoGestes",
        message: "Pensez à effectuer vos écogestes du jour !",
        iconUrl: '/icon.png',
        type: 'basic'
    });
};

const sendAlertNotification = function (hourValue) {
    const title = hourValue === 2 ? "Alerte orange - NumEcoGestes" : "Alerte rouge - NumEcoGestes",
        message = hourValue === 2 ? "La réduction et le décalage des consommations d’énergie sont nécessaires." : "Coupures inévitables si la consommation n’est pas réduite.";

    chrome.notifications.create('ECOGESTES_ALERT_NOTIF', {
        title: title,
        message: message,
        iconUrl: '/icon.png',
        type: 'basic'
    });
};

const sendAlertNotificationIfNeeded = function () {
    const now = new Date(),
        hour = now.getHours(),
        isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;

    const currentDay = this.signals.find(item => {
        return item.jour.indexOf(isoDate) !== -1;
    });

    if (!currentDay) {
        return;
    }

    const currentValue = currentDay.values.find(function (value) {
        return value.pas === hour;
    });

    if (currentValue.hvalue > 1) {
        sendAlertNotification(currentValue.hvalue);
    }
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
    } else if (alarm.name === "ecogestes-hourly-alert") {
        chrome.storage.local.get('alertNotification', function (data) {
            if (data.alertNotification.enabled) {
                sendAlertNotificationIfNeeded();
            }
        });
    } else if (alarm.name === "ecogestes-daily-alert") {
        chrome.storage.local.get('dailyNotification', function (data) {
            if (data.dailyNotification.enabled) {
                sendDailyNotification();
            }
        });
    }
})

chrome.runtime.onInstalled.addListener(function () {
    let date = new Date(),
        tomorrowDate = new Date();
    date.setHours(date.getHours() + 1);
    date.setMinutes(0, 0, 0);
    tomorrowDate.setDate(date.getDate() + 1)
    tomorrowDate.setHours(10, 0, 0, 0);

    chrome.alarms.create("ecogestes-ecowatt-data", { periodInMinutes: 60 });
    getEcowattData();

    chrome.storage.local.set({ dailyNotification: { enabled: true }, alertNotification: { enabled: true } });
    chrome.alarms.create("ecogestes-hourly-alert", { when: date.getTime(), periodInMinutes: 60 });
    chrome.alarms.create("ecogestes-daily-alert", { when: tomorrowDate.getTime(), periodInMinutes: 1440 });

    initData();
});

(chrome.action || chrome.browserAction).onClicked.addListener(() => {
    chrome.tabs.create({ url: "index.html" });
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    if (notificationId === "ECOGESTES_ALERT_NOTIF" || notificationId === "ECOGESTES_DAILY_NOTIF") {
        chrome.notifications.clear(notificationId);
        chrome.tabs.create({ url: "index.html" });
    }
});

chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'ecogestes-debug-alert-notification') {
        setTimeout(function () {
            sendAlertNotification(3);
        }, 1000 * data.delayInSeconds);
    } else if (data.type === 'ecogestes-debug-daily-notification') {
        setTimeout(function () {
            sendDailyNotification();
        }, 1000 * data.delayInSeconds);
    }
});
