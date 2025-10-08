// storage.js

export function saveFavorite(trailName) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(trailName)) {
    favorites.push(trailName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
