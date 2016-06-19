function showDialog(tabId, title, content) {
    chrome.tabs.sendMessage(tabId, {action: "SHOW_IFRAME"}, function (response) {
        chrome.tabs.sendMessage(tabId, {
            action: "SHOW_DIALOG",
            data: {title: title, content: content, backgroundDismiss: true}
        });
    });
}

function showDialogEx(tabId, options) {
    options.backgroundDismiss = true;
    chrome.tabs.sendMessage(tabId, {action: "SHOW_IFRAME"}, function (response) {
        chrome.tabs.sendMessage(tabId, {
            action: "SHOW_DIALOG",
            data: options
        });
    });
}

function showDateTime(info, tab) {
    var text = info.selectionText;
    try {
        var time = parseInt(text);

        var message = "";
        if (time <= new Date("1990/01/01").getTime()) {
            message += new Date(time * 1000).toLocaleString() + "\n";
        }
        message += new Date(time).toLocaleString();
        message = "<pre>" + message + "</pre>";
        showDialog(tab.id, "DateTime", message);
    } catch (e) {
        alert(e.message);
    }
}

chrome.contextMenus.create({
    "title": "DateTime", "contexts": ["selection"],
    "onclick": function (info, tab) {
        showDateTime(info, tab);
    }
});

var base64Menu = chrome.contextMenus.create({
    "title": "Base64", "contexts": ["selection"]
});
chrome.contextMenus.create({
    "title": "Decode", "parentId": base64Menu, "contexts": ["selection"],
    "onclick": function (info, tab) {
        var content = info.selectionText;
        try {
            content = content.replace(/\s/g, "");
            content = $('<div/>').text(Base64.decode(content)).html();
            content = "<pre>" + content + "</pre>";
            showDialogEx(tab.id, {title: "Base64", content: content, columnClass: 'col-md-12'});
        } catch (e) {
            alert(e.message);
        }
    }
});
chrome.contextMenus.create({
    "title": "Encode", "parentId": base64Menu, "contexts": ["selection"],
    "onclick": function (info, tab) {
        var content = info.selectionText;
        try {
            content = $('<div/>').text(Base64.encode(content)).html();
            content = "<pre>" + content + "</pre>";
            showDialogEx(tab.id, {title: "Base64", content: content, columnClass: 'col-md-12'});
        } catch (e) {
            alert(e.message);
        }
    }
});
chrome.contextMenus.create({
    "title": "JSON", "contexts": ["selection"],
    "onclick": function (info, tab) {
        var content = info.selectionText;
        try {
            content = JSON.stringify(JSON.parse(content), null, 4);
            content = $('<div/>').text(content).html();
            content = "<pre>" + content + "</pre>";
            showDialogEx(tab.id, {title: "JSON", content: content, columnClass: 'col-md-12'});
        } catch (e) {
            alert(e.message);
        }
    }
});