// trails.js
import { saveFavorite, getFavorites } from "./storage.js";

const trailsContainer = document.getElementById("trailsContainer");
const modal = document.getElementById("trailModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

// Fetch trails from JSON
async function loadTrails() {
  try {
    const response = await fetch("data/trails.json");
    if (!response.ok) throw new Error("Failed to load data");

    const trails = await response.json();
    displayTrails(trails);
  } catch (err) {
    trailsContainer.innerHTML = `<p class="error">Error loading trails: ${err.message}</p>`;
  }
}

// Build cards dynamically
function displayTrails(trails) {
  trailsContainer.innerHTML = "";
  trails.forEach(trail => {
    const card = document.createElement("div");
    card.classList.add("trail-card");
    card.innerHTML = `
      <h3>${trail.name}</h3>
      <p><strong>Length:</strong> ${trail.length} km</p>
      <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
      <p><strong>Location:</strong> ${trail.location}</p>
      <button class="detailsBtn">Details</button>
      <button class="favBtn">❤️ Save</button>
    `;

    // Modal
    card.querySelector(".detailsBtn").addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalDetails.innerHTML = `
        <h2>${trail.name}</h2>
        <p>${trail.description}</p>
        <p><strong>Length:</strong> ${trail.length} km</p>
        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        <p><strong>Location:</strong> ${trail.location}</p>
      `;
    });

    // Save favorite
    card.querySelector(".favBtn").addEventListener("click", () => {
      saveFavorite(trail.name);
      alert(`${trail.name} saved to favorites!`);
    });

    trailsContainer.appendChild(card);
  });
}

// Close modal
if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

loadTrails();
