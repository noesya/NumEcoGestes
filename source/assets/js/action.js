window.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("signals").then(function (data) {
        var signalsList = document.getElementById("signals-list"),
            liNode;
        data.signals.signals.forEach(function (item) {
            liNode = document.createElement("li");
            liNode.innerText = `${new Date(item.jour).toLocaleString("fr-FR", { dateStyle: 'short' })} : ${item.message}`;
            signalsList.appendChild(liNode);
        });
    });
})