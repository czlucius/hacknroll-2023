// const { isValidElement } = require("react");

let sec = 0

document.addEventListener("focus", () => {
  console.log("focused")
  valid = true
  focused(valid)
});

document.addEventListener("blur", () => {
  console.log("blurred")
  valid = false
  focused(valid)
});
let timer

function createTimer() {
   timer = setInterval(() => {
    sec++
    console.log(sec)
  }, 1000);
}

function stopTimer() {
  clearInterval(timer)
}

function focused(valid) {
  if (valid) {
    createTimer()
  } else {
    stopTimer()
  }
}