chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message && message.action) {
        switch (message.action) {
            case "SHOW_DIALOG":
                var options = message.data;
                options.onClose = function () {
                    parent.postMessage({action: "CLOSE"}, "*");
                };
                $.alert(options);
                break;
        }
    }
});