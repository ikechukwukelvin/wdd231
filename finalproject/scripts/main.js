// main.js

// Footer year + last modified
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent =
    "Last Modified: " + document.lastModified;

  // Menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
    });
  }
});
