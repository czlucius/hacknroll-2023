function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getCurrentTab() {
    return browser.tabs.query({ currentWindow: true, active: true });
}


function generateBreakQuote() {
    console.log('18374917934')
    const quotes = ["Take a walk", "Close your eyes", "Look at trees", "Touch grass"]
    console.log("7934184")
    return quotes[Math.round(Math.random() * quotes.length - 1)]
}


function getValueOrCreate(key, defaultVal) {
    const val = browser.storage.sync.get(key)
    if (!val) {
        browser.storage.sync.set({[key]: defaultVal})
    }
    return val || defaultVal
}

