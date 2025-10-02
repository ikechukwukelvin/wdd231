export async function fetchTrails() {
  // Local JSON fetch (simulates external API)
  try {
    const resp = await fetch('/data/trails.json');
    if (!resp.ok) throw new Error('Network response not ok');
    const data = await resp.json();
    return data.trails;
  } catch (err) {
    console.error('fetchTrails error', err);
    throw err;
  }
}
