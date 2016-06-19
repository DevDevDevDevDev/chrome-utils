var iframe = document.createElement("iframe");
iframe.setAttribute("src", chrome.runtime.getURL("dialog.html"));
iframe.setAttribute("frameborder", "0");
iframe.setAttribute("style", "display:none;height:100%;width:100%;position:fixed;left:0px;top: 0px;z-index:10000");


document.body.appendChild(iframe);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message && message.action) {
        switch (message.action) {
            case "SHOW_IFRAME":
                iframe.style.display = "block";
                sendResponse();
                break;
        }
    }
});


window.addEventListener('message', function (event) {
    if (event.origin !== "chrome-extension://" + chrome.runtime.id) return;

    var data = event.data;
    if (data) {
        switch (data.action) {
            case "CLOSE":
                iframe.style.display = "none";
        }
    }
}, false);
