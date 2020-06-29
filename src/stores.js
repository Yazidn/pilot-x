import { writable } from "svelte/store";

// Media
const MediaStore = writable(
  JSON.parse(localStorage.getItem("MediaStore")) || []
);
MediaStore.subscribe(store =>
  localStorage.setItem("MediaStore", JSON.stringify(store))
);

// Details
const MediaDetailsStore = writable(
  JSON.parse(localStorage.getItem("MediaDetailsStore")) || []
);
MediaDetailsStore.subscribe(store =>
  localStorage.setItem("MediaDetailsStore", JSON.stringify(store))
);

// User Preferences
const Preferences = writable(
  JSON.parse(localStorage.getItem("Preferences")) || {
    advancedSearch: false,
    displayEditor: true,
    darkTheme: false,
    displayType: true,
    modalBackground: 'dim'
  }
);
Preferences.subscribe(store =>
  localStorage.setItem("Preferences", JSON.stringify(store))
);

export { MediaStore, MediaDetailsStore, Preferences };