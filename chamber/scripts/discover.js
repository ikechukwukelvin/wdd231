// set footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Build cards from embedded JSON; you can replace with a fetch('data/discover.json') if you save JSON externally.
    const jsonText = document.getElementById('discover-data').textContent;
    const data = JSON.parse(jsonText);
    const cards = document.getElementById('cards');

    function makeCard(item){
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
        </figure>
        <div class="card-body">
          <h2>${item.title}</h2>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <a class="btn" href="#" data-id="${item.id}" aria-label="Learn more about ${item.title}">Learn More</a>
        </div>
      `;
      return article;
    }

    data.items.forEach(it => cards.appendChild(makeCard(it)));

    // localStorage last visit logic
    const KEY = 'chamber-last-visit';
    const now = Date.now();
    const last = localStorage.getItem(KEY);
    const msgEl = document.getElementById('visit-message');

    function daysBetween(ms1, ms2){
      const msPerDay = 24*60*60*1000;
      return Math.floor(Math.abs(ms1 - ms2)/msPerDay);
    }

    if(!last){
      msgEl.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
      const diff = daysBetween(now, Number(last));
      if(diff === 0){
        msgEl.textContent = 'Back so soon! Awesome!';
      } else if(diff === 1){
        msgEl.textContent = 'You last visited 1 day ago.';
      } else {
        msgEl.textContent = `You last visited ${diff} days ago.`;
      }
    }

    // update last visit
    localStorage.setItem(KEY, now.toString());

    // Keyboard accessible Learn More: example opens an alert (you may replace with a modal or details page)
    cards.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if(!btn) return;
      e.preventDefault();
      const id = Number(btn.dataset.id);
      const item = data.items.find(x => x.id === id);
      if(item){
        alert(`${item.title}\n${item.address}\n\n${item.description}`);
      }
    });