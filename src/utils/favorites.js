const FAVORITES_KEY = "favoriteTracks";

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function isFavorited(trackId) {
  const favorites = getFavorites();
  return favorites.some((track) => track.trackId === trackId);
}

export function addFavorite(track) {
  const favorites = getFavorites();
  const updated = [...favorites, track];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function removeFavorite(trackId) {
  const favorites = getFavorites();
  const updated = favorites.filter((track) => track.trackId !== trackId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}
