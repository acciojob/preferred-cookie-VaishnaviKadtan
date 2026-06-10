//your JS code here. If required.
const form = document.querySelector("form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Set cookie helper
function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Get cookie helper
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply values to CSS variables
function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

// Load saved preferences on page load
window.addEventListener("load", () => {
  const savedSize = getCookie("fontsize");
  const savedColor = getCookie("fontcolor");

  if (savedSize) fontSizeInput.value = savedSize;
  if (savedColor) fontColorInput.value = savedColor;

  if (savedSize && savedColor) {
    applyPreferences(savedSize, savedColor);
  }
});

// Save preferences on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const size = fontSizeInput.value;
  const color = fontColorInput.value;

  setCookie("fontsize", size);
  setCookie("fontcolor", color);

  applyPreferences(size, color);
});