
// Helpers
async function getValueOrCreate(key, defaultVal) {
  const val = (await browser.storage.sync.get(key))[key];
  if (!val) {
      browser.storage.sync.set({[key]: defaultVal});
  }
  return val || defaultVal;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// Globals
let overlay;
let breakTimeout;


// Break Handling

const sendSkipBreak = () => {
  browser.runtime.sendMessage(JSON.stringify({ trigger: "endbreakearly" }));
}

const skipBreak = async () => {
  overlay.remove();
};

const displayBreakOverlay = async (quote) => {
  overlay = document.createElement('div');

  overlay.id = "breaks-overlay";
  overlay.innerHTML = `
      <div id="breaks-inner" style="padding: 16px; border: 2px solid white; background-color: black; position: fixed; inset: 0 0 0 0; height: fit-content; width: fit-content; margin: auto">
          <h2>Eye Care Reminder!</h2>
          <h2>${quote}</h2><br />
          <p>Break Left: <span>0s</span></p>
          <button id="skipBreakBtn" style="background-color: white">Skip break</button>
      </div>
  `;

  const btn = overlay.querySelector("#skipBreakBtn");
  
  if (await getValueOrCreate("disableSkip", false)) {
    btn.remove();
  } else {
    btn.style.color = "black";
    btn.style.fontSize = "15px";
    btn.style.margin = "5px";
    btn.style.position = "relative";

    btn.onclick = (event) => {
      sendSkipBreak();
    };
  }

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.textAlign = "center";
  overlay.style.zIndex = "99999999999";
  
  overlay.querySelector("#breaks-inner").style.borderRadius = "20px";
  overlay.querySelector("#breaks-inner").style.color = "white";
  overlay.querySelector("#breaks-inner").style.fontSize = "20px";

  document.body.appendChild(overlay);

  // Animate Popup
  overlay.querySelector("#breaks-inner").animate(
      [
        { transform: "scale(0.7)" },
        { transform: "scale(1)" }
      ], {
        duration: 2000
      }
  );

};

browser.runtime.onMessage.addListener(async data => {

  try {
    const jsondata = JSON.parse(data)
    const { trigger } = jsondata;
  
    if (jsondata.trigger === 'breaks') {
      const {quote} = jsondata
  
      await displayBreakOverlay(quote);
  
      // Set Alarm
      browser.runtime.sendMessage(JSON.stringify({
        trigger: "startBreak"
      }));
    }
    else if (jsondata.trigger === 'closeoverlay') {
      skipBreak();
    }
    else if (trigger === "onesecondinterval") {
      const alarm = jsondata.breakAlarm;
      if (alarm) {
        timeLeft = alarm.scheduledTime - Date.now();
      }
      
      if (overlay) {
        const timeLeftLabel = overlay.querySelector("span");
        if (timeLeftLabel) {
          timeLeftLabel.textContent = millisToMinutesAndSeconds(alarm.scheduledTime - Date.now());
      
          if (timeLeft - 1000 >= 0) {
            timeLeftLabel.textContent = millisToMinutesAndSeconds(timeLeft);
          } else {
            timeLeftLabel.textContent = "finished"
          }
        }
      }
    }

  } catch {}
});


// // Skip (Stop) Break when timer over
// browser.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "breakAlarm") {
//     skipBreak();
//   }
// });

// browser.alarms.onAlarm.addListener(alarm => {
//   if (alarm.name === "onesecondinterval") {
//     console.log("1s");
//     runTimeLeftUpdate();
//   }
// });
