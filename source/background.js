const onAlarmData = function () {
    fetch("https://raw.githubusercontent.com/noesya/ecogestes-mirror/main/file/ecowatt.json").then(function (res) {
        return res.json();
    }).then(function (signals) {
        chrome.storage.local.set({ signals });
    })
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("ecogestes-data", { delayInMinutes: 0, periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "ecogestes-data") {
        onAlarmData();
    }
})
