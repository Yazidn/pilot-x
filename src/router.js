import Home from './components/views/Home.svelte';
import Add from './components/views/Add.svelte';
import Preferences from './components/views/Preferences.svelte';
import {writable} from 'svelte/store';
const router = {
    'home': Home,
    'add': Add,
    'preferences': Preferences,
}
export default router;
export const current = writable('home');