window.addEventListener("DOMContentLoaded", function () {
    var debugNotificationBtn = document.getElementById('debug-notification-btn');
        debugBannerBtn = document.getElementById('debug-banner-btn');

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