const getEcowattData = function () {
    fetch("https://ecoresponsable.numerique.gouv.fr/api/ecowatt/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    });
};

const randomHexString = function () {
    const length = 8;
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < length; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

const sendDailyNotification = function () {
    chrome.notifications.create(`ECOGESTES_DAILY_NOTIF-${randomHexString()}`, {
        title: "NumÉcoGestes",
        message: "Pensez à effectuer vos écogestes du jour !",
        iconUrl: '/icon.png',
        type: 'basic'
    });
};

const sendAlertNotification = function (hour, hourValue) {
    const nextHour = hour + 1 % 24;
    const title = hourValue === 2 ? `Alerte orange de ${hour}h à ${nextHour}h - NumÉcoGestes` : `Alerte rouge de ${hour}h à ${nextHour}h - NumÉcoGestes`,
        message = hourValue === 2 ? "La réduction et le décalage des consommations d’énergie sont nécessaires." : "Coupures inévitables si la consommation n’est pas réduite.";

    chrome.notifications.create(`ECOGESTES_ALERT_NOTIF-${randomHexString()}`, {
        title: title,
        message: message,
        iconUrl: (hourValue === 2 ? '/icon-orange.png' : '/icon-red.png'),
        type: 'basic'
    });
};

const sendAlertNotificationIfNeeded = function () {
    const now = new Date(),
        hour = now.getHours() + 1,
        isoDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, 0)}-${now.getDate().toString().padStart(2, 0)}`;

    chrome.storage.local.get("signals", function (data) {
        const currentDay = data.signals.signals.find(item => {
            return item.jour.indexOf(isoDate) !== -1;
        });

        if (!currentDay) {
            return;
        }

        const currentValue = currentDay.values.find(function (value) {
            return value.pas === hour;
        });

        if (currentValue.hvalue > 1) {
            sendAlertNotification(hour, currentValue.hvalue);
        }
    }.bind(this));
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
    let nextHourlyDate = new Date(),
        nextDailyDate = new Date();

    if (nextHourlyDate.getMinutes() >= 50) {
        // If 9:50, next hourly is at 10:55 instead of 9:55
        nextHourlyDate.setHours(nextHourlyDate.getHours() + 1);
    }
    nextHourlyDate.setMinutes(55, 0, 0);

    if (nextDailyDate.getHours() === 9 && nextDailyDate.getMinutes() >= 50 || nextDailyDate.getHours() > 9) {
        // Set alert for tomorrow if current time is 9:50 or later
        nextDailyDate.setDate(nextDailyDate.getDate() + 1)
    }
    nextDailyDate.setHours(10, 0, 0, 0);

    chrome.alarms.create("ecogestes-ecowatt-data", { periodInMinutes: 60 });
    getEcowattData();

    chrome.storage.local.set({ dailyNotification: { enabled: true }, alertNotification: { enabled: true } });
    chrome.alarms.create("ecogestes-hourly-alert", { when: nextHourlyDate.getTime(), periodInMinutes: 60 });
    chrome.alarms.create("ecogestes-daily-alert", { when: nextDailyDate.getTime(), periodInMinutes: 1440 });

    initData();
    chrome.tabs.create({ url: "index.html" });
});

(chrome.action || chrome.browserAction).onClicked.addListener(() => {
    chrome.tabs.create({ url: "index.html" });
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    if (notificationId.indexOf("ECOGESTES_") !== -1) {
        chrome.notifications.clear(notificationId);
        chrome.tabs.create({ url: "index.html" });
    }
});

chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'ecogestes-debug-alert-notification') {
        const hour = new Date().getHours() + 1;
        setTimeout(function () {
            sendAlertNotification(hour, 3);
        }, 1000 * data.delayInSeconds);
    } else if (data.type === 'ecogestes-debug-daily-notification') {
        setTimeout(function () {
            sendDailyNotification();
        }, 1000 * data.delayInSeconds);
    }
});
