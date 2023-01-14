"use strict";

async function getValueOrCreate(key, defaultVal) {
    console.log(key)
    const val = (await browser.storage.sync.get(key))[key]
    console.log("apl", val)
    if (!val) {
        browser.storage.sync.set({[key]: defaultVal})
    }
    return val || defaultVal
}


browser.runtime.onMessage.addListener(async data => {
    console.log("Overlaying...")


    const jsondata = JSON.parse(data)

    if (jsondata.trigger === 'breaks') {
        const {quote, trigger} = jsondata

        let overlay = document.createElement('div');
        overlay.id = "breaks-overlay"
        overlay.innerHTML = `
            <div id="breaks-inner" style="padding: 16px; background-color: blue; position: fixed; inset: 0 0 0 0; height: fit-content; width: fit-content; margin: auto">
                ${quote}
                <button id="skipBreakBtn" style="background-color: aliceblue">Skip break</button>
            </div>
        `
        // console.log("overlay", overlay)
        // console.log(overlay.querySelector("#skipBreakBtn"))
        const btn = overlay.querySelector("#skipBreakBtn")
        if (await getValueOrCreate("showSkip", false)) {
            btn.remove()
        }


        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.textAlign = "center"
        overlay.style.zIndex = "99999999999"

        document.body.appendChild(overlay);

        btn.onclick = (event) => {
            console.log("overlay removed via btn")
            overlay.remove()
            browser.tabs.query({}, function (tabs) {

                for (const tab of tabs) {

                    const msgPromise = browser.tabs.sendMessage(
                        tab.id,
                        JSON.stringify({trigger: "skipbreak"})
                    )


                }
            })}
        const breakDuration = await getValueOrCreate("breakDuration", 10)
        const periodInMinutes = browser.storage.sync.get("interval").interval || 60 * 10
        console.log("bd", breakDuration)
        setTimeout(() => {
            console.log("overlay removed via timeout")

            overlay.remove()
            console.log("triggered0")
            browser.runtime.sendMessage({'trigger': "enableAlarm"})
        }, breakDuration * 1000)
    }
    else if (jsondata.trigger === 'skipbreak') {
        console.log("removing overlay")
        document.getElementById("breaks-overlay").remove()
    }
});


function onBL() {
    let blueLight = document.createElement('div');
    blueLight.id = "blueLight-13749"
    blueLight.style.position = "fixed";
    blueLight.style.top = "0";
    blueLight.style.left = "0";
    blueLight.style.width = "100%";
    blueLight.style.height = "100%";
    blueLight.style.backgroundColor = "rgb(232, 216, 189, 0.15)"
    blueLight.style.pointerEvents = "None"
    blueLight.style.textAlign = "center"
    blueLight.style.zIndex = "9999999999"
    document.body.appendChild(blueLight)
}

function offBL() {
    document.getElementById("blueLight-13749").remove()
}


getValueOrCreate("blueLight", false)
    .then(enableBL => {
        console.log("enablebl", enableBL)
        if (enableBL) {
            onBL()
        } else {
            offBL()
        }
    })

browser.storage.onChanged.addListener(
    (update) => {
        console.log(update);

        if (update.blueLight !== undefined) {
            if (update.blueLight.newValue) {
                onBL()
            } else {
                offBL()
            }
        }

    }
)