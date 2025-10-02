export function createCard(trail) {
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <img class="thumb" src="${trail.image}" alt="${trail.name} photo" loading="lazy" />
    <h3>${trail.name}</h3>
    <p>${trail.summary}</p>
    <p class="trail-meta">Difficulty: ${trail.difficulty} · Length: ${trail.length}km</p>
    <button class="details-btn" data-id="${trail.id}">Details</button>
  `;
  return el;
}
