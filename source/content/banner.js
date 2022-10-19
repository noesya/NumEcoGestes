document.addEventListener("DOMContentLoaded", () => {
    // delay 50ms so that we get proper body dimensions
    setTimeout(load, 50);

    function load() {
        var openButton = document.getElementById("open-button"),
            closeButton = document.getElementById("close-button");

        openButton.addEventListener("click", (e) => {
            e.preventDefault();
            chrome.runtime.sendMessage({
                type: "ecogestes-send-open-from-banner",
            });
        });

        closeButton.addEventListener("click", (e) => {
            e.preventDefault();
            chrome.runtime.sendMessage({
                type: "ecogestes-send-close-banner",
            });
        });
    }
});