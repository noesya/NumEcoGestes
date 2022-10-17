chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'ecogestes-debug-banner-display') {
        var banner = document.createElement('div');
        banner.style.width = "100%";
        banner.style.top = "0px";
        banner.style.left = "0px";
        banner.style.padding = "10px";
        banner.style.position = "fixed";
        banner.style.zIndex = 2147483647;
        banner.style.visibility = "visible";
        banner.style.background = "white";
        banner.style.color = "black";

        banner.innerText = "Bannière de débogage"
        document.body.appendChild(banner);
    }
});
