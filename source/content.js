const openBanner = function () {
    var iframeUrl = chrome.runtime.getURL("content/banner.html"),
        iframe = document.createElement("iframe"),
        frameDiv = document.createElement("div"),
        spacer = document.createElement("div");

    iframe.style.cssText = "height: 42px; width: 100%; border: 0; min-height: initial;";
    iframe.id = "ecogestes-banner-iframe";
    iframe.src = iframeUrl;

    frameDiv.setAttribute("aria-live", "polite");
    frameDiv.id = "ecogestes-banner";
    frameDiv.style.cssText =
        "height: 42px; width: 100%; top: 0; left: 0; padding: 0; position: fixed; " +
        "z-index: 2147483647; visibility: visible;";
    frameDiv.appendChild(iframe);
    document.body.appendChild(frameDiv);

    iframe.contentWindow.location = iframeUrl;

    spacer.id = "ecogestes-banner-spacer";
    spacer.style.cssText = "height: 42px;";
    document.body.insertBefore(spacer, document.body.firstChild);
};

const closeBanner = function () {
    const bannerEl = document.getElementById("ecogestes-banner");
    if (bannerEl != null) {
        bannerEl.parentElement.removeChild(bannerEl);
    }

    const spacerEl = document.getElementById("ecogestes-banner-spacer");
    if (spacerEl) {
        spacerEl.parentElement.removeChild(spacerEl);
    }
};

chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'ecogestes-debug-banner-display') {
        openBanner();
    } else if (data.type === 'ecogestes-close-banner') {
        closeBanner();
    }
});
