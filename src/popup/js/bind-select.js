
const intervalSelect = document.querySelector("#interval-select");
const durationSelect = document.querySelector("#breaks-select");

intervalSelect.onchange = async e => {
  const interval = parseInt(e.target.value);
  await browser.storage.sync.set({ interval });
};

durationSelect.onchange = async e => {
  const breakDuration = parseInt(e.target.value);
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