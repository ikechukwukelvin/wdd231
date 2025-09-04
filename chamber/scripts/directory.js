document.addEventListener("DOMContentLoaded", () => {
  const gridButton = document.getElementById("grid-view");
  const listButton = document.getElementById("list-view");
  const directory = document.getElementById("directory");

  gridButton.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
  });

  listButton.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
  });

  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      const data = await response.json();
      displayMembers(data.members);
    } catch (err) {
      console.error("Error loading members:", err);
    }
  }

  function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${member.membershipLevel}</p>
      `;

      directory.appendChild(card);
    });
  }

  // Footer dynamic content
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

  getMembers();
});
