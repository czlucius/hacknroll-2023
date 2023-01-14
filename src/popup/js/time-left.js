
const timeLeftValue = document.querySelector(".time-left");
let timeLeft = 0;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

setInterval(async () => {
  const alarm = await browser.alarms.get("Breaks");
  if (alarm) {
    console.log("hello");
    timeLeft = alarm.scheduledTime - Date.now();
  }
  if (timeLeft - 1000 >= 0) {
    timeLeftValue.textContent = millisToMinutesAndSeconds(timeLeft);
  }
}, 1000);