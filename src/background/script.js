// console.log("9hgvf92h9fg29fh9")

const periodInMinutes = browser.storage.sync.get("interval").interval || 60*10

browser.alarms.create(
    "Breaks",
    {
        periodInMinutes
    }
)

browser.storage.onChanged.addListener(
    (update) => { console.log(update); 
        
    if (update.interval !== undefined){
        browser.alarms.clear("Breaks")

        browser.alarms.create(
            "Breaks",
            {
                periodInMinutes: update.interval.newValue
            }
        )
    }

    }
)

browser.alarms.onAlarm.addListener(handleAlarm)


function handleAlarm(alarmInfo) {
    const name = alarmInfo.name
    console.log( name)

    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        // chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
    });
}

