const intervalSelect = document.querySelector("#interval-select");
const durationSelect = document.querySelector("#breaks-select");
const disableSkipSelect = document.getElementById("disable-skip-select")
const blueLightSelect = document.getElementById("enable-blue-light")

function secondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    const sec = seconds - (minutes * 60)
    return minutes + ":" + (sec < 10 ? '0' : '') + sec;
}


intervalSelect.onchange = async e => {
    const interval = parseInt(e.target.value);
    document.getElementById("interval").innerText = `Select Interval (${secondsToMinutesAndSeconds(interval)}): `
    await browser.storage.sync.set({interval});
};

durationSelect.onchange = async e => {
    const breakDuration = parseInt(e.target.value);
    document.getElementById("break").innerText = `Break Duration (${secondsToMinutesAndSeconds(breakDuration)}): `
    await browser.storage.sync.set({breakDuration});
};

disableSkipSelect.addEventListener('change', async (event) => {
    await browser.storage.sync.set({showSkip: event.currentTarget.checked});
})



const syncSelectValues = async () => {
    const {interval, breakDuration, disableSkip, blueLight} = await browser.storage.sync.get(["interval", "breakDuration", "disableSkip", "blueLight"]);
    intervalSelect.value = interval;
    durationSelect.value = breakDuration;
    blueLightSelect.checked = blueLight
    disableSkipSelect.checked = disableSkip
}

const initStorageValues = async () => {
    const {interval, breakDuration, disableSkip, blueLight} = await browser.storage.sync.get(["interval", "breakDuration", "disableSkip", "blueLight"]);
    if (!interval) await browser.storage.sync.set({"interval": 10 * 60});
    if (!breakDuration) await browser.storage.sync.set({"breakDuration": 10});
    if (disableSkip === undefined) await browser.storage.sync.set({"disableSkip": false})
    if (blueLight === undefined) await browser.storage.sync.set({"blueLight": true})
};

(async () => {
    await initStorageValues();
    await syncSelectValues();
    blueLightSelect.addEventListener("change", async (event) => {
        await browser.storage.sync.set({blueLight: event.currentTarget.checked});

    })
})();