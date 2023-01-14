
const timeLeftValue = document.querySelector(".time-left");
let timeLeft = 0;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

browser.runtime.onMessage.addListener( async (data) => {
  const { trigger } = JSON.parse(data);
  if (trigger === "alarmStart") {
    const alarm = await browser.alarms.get("Breaks");
    if (alarm) {
      console.log("hello");
      timeLeft = alarm.scheduledTime - Date.now();
    }
  }
});

setInterval(async () => {
  const alarm = await browser.alarms.get("Breaks");
  if (alarm) {
    console.log("hello");
    timeLeft = alarm.scheduledTime - Date.now();
  }
  if (timeLeft - 1000 >= 0) {
    timeLeft -= 1000;
    timeLeftValue.textContent = millisToMinutesAndSeconds(timeLeft);
  }
}, 1000);