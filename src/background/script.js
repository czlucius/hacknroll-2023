// console.log("9hgvf92h9fg29fh9")

const periodInMinutes = browser.storage.sync.get("intervalPeriodMins").value
browser.alarms.create(
    "Breaks",
    {
        periodInMinutes
    }
)

browser.alarms.onAlarm.addListener(handleAlarm)


function handleAlarm(alarmInfo) {
    const name = alarmInfo.name
    console.log(name)

    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        // chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
    });
}

