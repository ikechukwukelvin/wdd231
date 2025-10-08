import { fetchTrails } from './api.js';
import { createCard } from './ui.js';
import { openModal, closeModal } from './modal.js';

const yearEls = [document.getElementById('year'), document.getElementById('year2')].filter(Boolean);
yearEls.forEach(e => e.textContent = new Date().getFullYear());

const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.style.display = expanded ? 'none' : 'block';
  });
}

// Load highlights on homepage
async function initHighlights() {
  try {
    const trails = await fetchTrails();
    const container = document.getElementById('highlights-list');
    if (!container) return;
    const top = trails.slice(0,4).map(createCard);
    top.forEach(c => container.appendChild(c));
    // attach detail handlers
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.details-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const trail = trails.find(t=>String(t.id)===String(id));
      if (!trail) return;
      const modal = document.getElementById('modal');
      openModal(modal, `<h2>${trail.name}</h2><p>${trail.description}</p><p>Length: ${trail.length}km · Difficulty: ${trail.difficulty}</p>`);
      document.getElementById('close-modal').addEventListener('click', ()=>closeModal(modal));
    });
  } catch (err) {
    console.error(err);
  }
}
initHighlights();
