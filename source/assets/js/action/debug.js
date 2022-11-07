window.addEventListener("DOMContentLoaded", function () {
    var debugNotificationBtn = document.getElementById('debug-notification-btn');

    debugNotificationBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage('', {
            type: 'ecogestes-debug-notification',
            delayInSeconds: parseInt(document.getElementById("delay-input").value)
        });
    });
});
