"use strict";


browser.runtime.onMessage.addListener(data => {
    console.log("Overlaying...")


    const {quote, timeout, trigger} = JSON.parse(data)

    if (trigger === 'breaks') {

        let overlay = document.createElement('div');
        overlay.id = "breaks-overlay"
        overlay.innerHTML = `
            <div id="breaks-inner" style="padding: 16px; background-color: blue; position: fixed; inset: 0 0 0 0; height: fit-content; width: fit-content; margin: auto">
                ${quote}
                <button id="skipBreakBtn" style="background-color: aliceblue" onclick="(function(){
    alert('Hey i am calling');
    return false;
})();return false;">Skip break</button>
            </div>
        `
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overlay.style.textAlign = "center"
        overlay.style.zIndex = "99999999999"

        document.body.appendChild(overlay);
    }
});