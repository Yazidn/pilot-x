import { writable } from "svelte/store";

// ROUTES
import Home from "./lib/routes/home.svelte";
import Add from "./lib/routes/add.svelte";
import Preferences from "./lib/routes/preferences.svelte";

// ROUTE REFERENCES
const router = {
  home: Home,
  add: Add,
  preferences: Preferences,
};

export default router;
export const current = writable("home");