<script>
	import Navigation from './lib/navigation.svelte';
	import router, {current} from './router.js';
	import {MediaStore, MediaDetailsStore, Preferences} from './stores.js';

	MediaStore.subscribe(store => localStorage.setItem('MediaStore', JSON.stringify(store)))
	MediaDetailsStore.subscribe(store => localStorage.setItem('MediaDetailsStore', JSON.stringify(store)))
	Preferences.subscribe(store => localStorage.setItem('Preferences', JSON.stringify(store)))
</script>

<Navigation />
<main class="pb-20">
	<svelte:component this={router[$current]}/>
</main>