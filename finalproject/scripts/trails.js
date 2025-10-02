import { fetchTrails } from './api.js';
import { createCard } from './ui.js';
import { openModal, closeModal } from './modal.js';

const search = document.getElementById('search');
const difficulty = document.getElementById('difficulty');
const list = document.getElementById('trails-list');
const template = document.getElementById('trail-template');

let allTrails = [];

async function render(filters={}) {
  list.innerHTML = '';
  const filtered = allTrails.filter(t => {
    if (filters.q && !t.name.toLowerCase().includes(filters.q.toLowerCase()) && !t.summary.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.difficulty && t.difficulty !== filters.difficulty) return false;
    return true;
  });
  // dynamic generation: at least 15 items are present in data; show them
  filtered.forEach(t => {
    const node = template.content.cloneNode(true);
    node.querySelector('.thumb').src = t.image;
    node.querySelector('.thumb').alt = t.name + ' image';
    node.querySelector('.trail-name').textContent = t.name;
    node.querySelector('.trail-desc').textContent = t.summary;
    node.querySelector('.trail-meta').textContent = `Difficulty: ${t.difficulty} · ${t.length}km`;
    node.querySelector('.details-btn').dataset.id = t.id;
    list.appendChild(node);
  });
}

async function init() {
  try {
    allTrails = await fetchTrails();
    // Save a preference to localStorage example
    const saved = localStorage.getItem('rb_last_difficulty') || '';
    if (saved) difficulty.value = saved;
    await render({difficulty: difficulty.value});
    // attach events
    search.addEventListener('input', (e)=> render({q: e.target.value, difficulty: difficulty.value}));
    difficulty.addEventListener('change', (e)=> {
      localStorage.setItem('rb_last_difficulty', e.target.value);
      render({q: search.value, difficulty: e.target.value});
    });
    list.addEventListener('click', (e)=>{
      const btn = e.target.closest('.details-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const trail = allTrails.find(t=>String(t.id)===String(id));
      const modal = document.getElementById('modal-trail');
      openModal(modal, `<h2>${trail.name}</h2><p>${trail.description}</p><ul><li>Difficulty: ${trail.difficulty}</li><li>Length: ${trail.length} km</li><li>Region: ${trail.region}</li></ul>`);
      document.getElementById('close-modal-trail').addEventListener('click', ()=>closeModal(modal));
    });
  } catch (err) {
    console.error(err);
  }
}
init();
