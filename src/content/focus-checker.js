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

function focused(valid) {
  if (valid) {
    console.log("page focused")
  } else {
    console.log("page not focused")
  }
}