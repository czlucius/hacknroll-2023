
const displaylog = arg => {
  const p = document.createElement("p");
  p.textContent = JSON.stringify(arg);
  document.body.appendChild(p);
};