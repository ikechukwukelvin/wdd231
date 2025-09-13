async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const goldSilver = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

  const selected = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.getElementById("spotlight-container");
  container.innerHTML = selected.map(m => `
    <div class="card">
      <img src="${m.logo}" alt="${m.name} logo">
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank">Visit Website</a>
      <p class="level">${m.membership} Member</p>
    </div>
  `).join("");
}

loadSpotlights();
