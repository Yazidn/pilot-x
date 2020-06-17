import {writable} from 'svelte/store';

const MediaStore = writable(JSON.parse(localStorage.getItem('MediaStore')) || []);
const MediaDetailsStore = writable(JSON.parse(localStorage.getItem('MediaDetailsStore')) || []);
const Preferences = writable(JSON.parse(localStorage.getItem('Preferences')) || {
	advancedSearch: false,
	displayEditor: true,
	darkTheme: false,
	displayType: true
});

export { MediaStore, MediaDetailsStore, Preferences }