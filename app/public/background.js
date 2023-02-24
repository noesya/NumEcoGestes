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
        nextMonth,
        daysUntilNextMonth,
        monthKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, 0)}`,
        dayKey = `${monthKey}-${currentDate.getDate().toString().padStart(2, 0)}`,
        monthsData = {},
        monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

    if (currentDate.getMonth() == 11) {
        nextMonth = new Date(currentDate.getFullYear() + 1, 0, 1);
    } else {
        nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }

    daysUntilNextMonth = Math.ceil((nextMonth.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

    monthsData[monthKey] = {
        label: {
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear().toString()
        },
        score: 0,
        alerts: { red: 0, orange: 0 },
        days: {},
        monthEndModalSent: daysUntilNextMonth <= 3
    };
    monthsData[monthKey]["days"][dayKey] = {
        alerts: { red: 0, orange: 0 },
        ecogestes: {},
        score: 0
    }

    chrome.storage.local.set({ months: monthsData }, function () {
        chrome.tabs.create({ url: "index.html" });
    });
};

const checkIcon = function () {
    const date = new Date(),
          isoDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;

    let hValue,
        iconPath;

    chrome.storage.local.get("signals", function (data) {
        const currentDay = data.signals.signals.find(item => {
            return item.jour.indexOf(isoDate) !== -1;
        });

        if (currentDay) {
            const currentValue = currentDay.values.find(function (value) {
                return value.pas === date.getHours();
            });
            hValue = currentValue.hvalue;
        } else {
            hValue = 1;
        }

        switch (hValue) {
            case 3:
                iconPath = "/icon-red.png";
                break;
            case 2:
                iconPath = "/icon-orange.png";
                break;
            default:
                iconPath = "/icon.png";
                break;
        }

        (chrome.action || chrome.browserAction).setIcon({
            path: iconPath
        });
    }.bind(this));
};

const initHourlyAlarm = function () {
    let nextHourlyDate = new Date();
    if (nextHourlyDate.getMinutes() >= 50) {
        // If 9:50, next hourly is at 10:55 instead of 9:55
        nextHourlyDate.setHours(nextHourlyDate.getHours() + 1);
    }
    nextHourlyDate.setMinutes(55, 0, 0);
    chrome.alarms.create("ecogestes-hourly-alert", { when: nextHourlyDate.getTime(), periodInMinutes: 60 });
};

const initDailyAlarm = function () {
    let nextDailyDate = new Date(),
        possibleHours = [8, 9, 10, 11, 14, 15, 16, 17, 18],
        randomHourIndex = Math.floor(Math.random() * possibleHours.length),
        randomHour = possibleHours[randomHourIndex],
        randomMinute = Math.floor(Math.random() * 60);
    // Set alert for tomorrow
    nextDailyDate.setDate(nextDailyDate.getDate() + 1);
    // Set random time between 8:00-12:00 & 14:00-19:00
    nextDailyDate.setHours(randomHour, randomMinute, 0, 0);
    chrome.alarms.create("ecogestes-daily-alert", { when: nextDailyDate.getTime() });
};

const checkAlarms = function () {
    chrome.alarms.getAll(function (alarms) {
        if (alarms.length === 0) {
            initHourlyAlarm();
            initDailyAlarm();
            chrome.alarms.create("ecogestes-ecowatt-data", { periodInMinutes: 60 });
            chrome.alarms.create('ecogestes-icon-check', { when: Date.now() + 60 * 1000, periodInMinutes: 1 });
        }
    });
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
            // We re-create the alarm manually for a random time the next day
            initDailyAlarm();
        });
    } else if (alarm.name === "ecogestes-icon-check") {
        checkIcon();
    }
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ dailyNotification: { enabled: true }, alertNotification: { enabled: true } });
    checkAlarms();
    getEcowattData();
    initData();
});

(chrome.action || chrome.browserAction).onClicked.addListener(() => {
    chrome.tabs.create({ url: "index.html" });
});

chrome.runtime.onStartup.addListener(function () {
    getEcowattData();
    checkIcon();
    checkAlarms();
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
