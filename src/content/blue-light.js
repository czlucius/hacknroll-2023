
// Helpers
async function getValueOrCreate(key, defaultVal) {
  const val = (await browser.storage.sync.get(key))[key];
  if (!val) {
      browser.storage.sync.set({[key]: defaultVal});
  }
  return val || defaultVal;
}

// Blue Light
function onBL() {
  let blueLight = document.createElement('div');
  blueLight.id = "blueLight-13749";
  blueLight.style.position = "fixed";
  blueLight.style.top = "0";
  blueLight.style.left = "0";
  blueLight.style.width = "100%";
  blueLight.style.height = "100%";
  blueLight.style.backgroundColor = "rgb(232, 216, 189)";
  blueLight.style.mixBlendMode = "multiply";
  blueLight.style.pointerEvents = "None";
  blueLight.style.textAlign = "center";
  blueLight.style.zIndex = "9999999999";
  document.body.appendChild(blueLight);
}

function offBL() {
  document.getElementById("blueLight-13749").remove();
}

const handleBLChange = (enableBl) => {
  if (enableBl) {
    onBL();
  } else {
    offBL();
  }
};

// Set BL Initially
getValueOrCreate("blueLight", false)
  .then(enableBL => handleBLChange(enableBL));

// Set BL when changed
browser.storage.onChanged.addListener((update) => {
    if (update.blueLight !== undefined) {
      handleBLChange(update.blueLight.newValue);
    }
});