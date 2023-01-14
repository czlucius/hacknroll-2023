const broadcastAlarmStart = () => {
    browser.runtime.sendMessage(JSON.stringify({trigger: "alarmStart"}));
}

const periodInSecs = browser.storage.sync.get("interval").interval || 60 * 10

browser.alarms.create(
    "Breaks",
    {
        periodInMinutes: periodInSecs / 60
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
    const quotes = ["Take a walk", "Close your eyes", "Look at trees", "Touch grass", "Go to the park","Have a snack","Look around you","Talk to someone"]
    return quotes[Math.round(Math.random() * quotes.length - 1)]
}


async function getValueOrCreate(key, defaultVal) {
    const val = await browser.storage.sync.get(key).breakDuration
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
        browser.tabs.query({}, function (tabs) {

            for (const tab of tabs) {
                console.log("1487")

                const msgPromise = browser.tabs.sendMessage(
                    tab.id,
                    JSON.stringify({trigger: "breaks", quote})
                ).then(_ => {
                    browser.alarms.clear("Breaks")
                })


            }
        })


        console.log(res)
    }
}


browser.runtime.onMessage.addListener(msg => {
    console.log("triggered1")
    const trigger = msg.trigger
    console.log(trigger)
    if (trigger === "enableAlarm") {
        console.log("alarms are working!")
        // we enable alarm here

        browser.alarms.clear("Breaks")
        browser.storage.sync.get("interval").then(res => {
            const periodInMinutes = res.interval || 60 * 10
            browser.alarms.create(
                "Breaks",
                {
                    periodInMinutes: periodInMinutes / 60
                }
            )
        })

    }
})

