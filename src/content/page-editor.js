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
        const {quote} = jsondata

        let overlay = document.createElement('div');
        overlay.id = "breaks-overlay"
        overlay.innerHTML = `
            <div id="breaks-inner" style="padding: 16px; border: 2px solid white; background-color: black; position: fixed; inset: 0 0 0 0; height: fit-content; width: fit-content; margin: auto">
                <h2>Eye Care Reminder!</h2>
                <h2>${quote}</h2><br />
                <button id="skipBreakBtn" style="background-color: white">Skip break</button>
            </div>
        `

        const btn = overlay.querySelector("#skipBreakBtn")
        if (await getValueOrCreate("disableSkip", false)) {
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
        overlay.querySelector("#breaks-inner").style.borderRadius = "20px"
        overlay.querySelector("#breaks-inner").style.color = "white"
        overlay.querySelector("#skipBreakBtn").style.color = "black"
        
        overlay.querySelector("#breaks-inner").style.fontSize = "20px"
        overlay.querySelector("#skipBreakBtn").style.fontSize = "15px"
        overlay.querySelector("#skipBreakBtn").style.margin = "5px"
        overlay.querySelector("#skipBreakBtn").style.position = "relative"

        document.body.appendChild(overlay);

        overlay.querySelector("#breaks-inner").animate(
            [
              { transform: "scale(0.7)" },
              { transform: "scale(1)" }
            ], {
              duration: 2000
            }
        );

        // User Skipped Break
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

        // Get Break Duration
        const breakDuration = await getValueOrCreate("breakDuration", 10)

        // Remove Overlay via Timeout
        setTimeout(() => {
            overlay.remove()
            browser.runtime.sendMessage({'trigger': "enableAlarm"})
        }, breakDuration * 1000)
    }
    else if (jsondata.trigger === 'skipbreak') {
        document.getElementById("breaks-overlay").remove()
    }
});



