const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // Debugging
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create card
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let dob = document.createElement('p');
    let pob = document.createElement('p');

    // Full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day Prophet`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Extra info
    dob.textContent = `Date of Birth: ${prophet.birthdate}`;
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Build card
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(portrait);

    // Add to DOM
    cards.appendChild(card);
  });
};

getProphetData();
