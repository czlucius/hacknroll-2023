
const intervalSelect = document.querySelector("#interval-select");
const durationSelect = document.querySelector("#breaks-select");


function secondsToMinutesAndSeconds(seconds) {
  var minutes = Math.floor(seconds / 60);
  const sec = seconds - (minutes * 60)
  return minutes + ":" + (sec < 10 ? '0' : '') + sec;
}


intervalSelect.onchange = async e => {
  const interval = parseInt(e.target.value);
  document.getElementById("interval").innerText = `Select Interval (${secondsToMinutesAndSeconds(interval)}): `
  await browser.storage.sync.set({ interval });
};

durationSelect.onchange = async e => {
  const breakDuration = parseInt(e.target.value);
  document.getElementById("break").innerText = `Break Duration (${secondsToMinutesAndSeconds(breakDuration)}): `
  await browser.storage.sync.set({ breakDuration });
};

const syncSelectValues = async () => {
  const { interval, breakDuration } = await browser.storage.sync.get(["interval", "breakDuration"]);
  intervalSelect.value = interval;
  durationSelect.value = breakDuration;
}

const initStorageValues = async () => {
  const { interval, breakDuration } = await browser.storage.sync.get(["interval", "breakDuration"]);
  if (!interval) await browser.storage.sync.set({ "interval": 10*60 });
  if (!breakDuration) await browser.storage.sync.set({ "breakDuration": 10 });
};

(async () => {
  await initStorageValues();
  await syncSelectValues();
})();