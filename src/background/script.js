// console.log("9hgvf92h9fg29fh9")

const periodInMinutes = 10.0
browser.alarms.create(
    "Breaks",
    {
        periodInMinutes
    }
)

browser.alarms.onAlarm.addListener(handleAlarm)


function handleAlarm(alarmInfo) {
    console.log("on alarm:", alarmInfo)

}