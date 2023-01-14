
const broadcastAlarmStart = () => {
  browser.runtime.sendMessage(JSON.stringify({ trigger: "alarmStart" }));
}

const periodInMinutes = browser.storage.sync.get("interval").interval || 60*10

browser.alarms.create(
    "Breaks",
    {
        periodInMinutes: periodInMinutes / 60
    }
)
broadcastAlarmStart();

browser.storage.onChanged.addListener(
    (update) => {
        console.log(update);

        if (update.interval !== undefined) {
            browser.alarms.clear("Breaks")

            browser.alarms.create(
                "Breaks",
                {
                    periodInMinutes: update.interval.newValue / 60
                }
            )
            broadcastAlarmStart();
        }

    }
)

browser.alarms.onAlarm.addListener(handleAlarm)

function generateBreakQuote() {
    const quotes = ["Take a walk", "Close your eyes", "Look at trees", "Touch grass"]
    return quotes[Math.round(Math.random() * quotes.length - 1)]
}


function getValueOrCreate(key, defaultVal) {
    const val = browser.storage.sync.get(key)
    if (!val) {
        browser.storage.sync.set({[key]: defaultVal})
    }
    return val || defaultVal
}



 function handleAlarm(alarmInfo) {
    const name = alarmInfo.name

    if (name === "Breaks") {
        // console.log("alarm is ", name);
        console.log("a", generateBreakQuote)

        const quote = generateBreakQuote()
        const breakDuration = getValueOrCreate("breakDuration", 10)
        browser.tabs.query({}, function (tabs) {

            for (const tab of tabs) {
                console.log("1487")

                const msgPromise = browser.tabs.sendMessage(
                    tab.id,
                    JSON.stringify({trigger: "breaks", quote, breakDuration})
                )


            }
        })




        console.log(res)
    }
}

