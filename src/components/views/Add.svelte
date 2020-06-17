<script>
	import {MediaStore, MediaDetailsStore, Config, Preferences} from '../../stores.js';
	import {current} from '../../router.js';

	const akey = $Config.apiKey;
	let media = {}, mediaDetails = {}, value = '', found, notfound, imdbID = '';
	let advanced = $Preferences.advancedSearch;

	async function find() {
		let url = `https://www.omdbapi.com/?apikey=${akey}${value ? `&t=${value}`: ``}${imdbID ? `&i=${imdbID}`: ``}`;
		const response = await fetch(url);
		if (response.ok) {
			const json = await response.json();
			if (json.Response === 'False') {
				[found, notfound] = [false, true];
				if (value === '' && imdbID === '') resetLocalState();
			} else {
				[found, notfound] = [true, false];
				[media, mediaDetails] = [{
					title: json.Title,
					poster: json.Poster,
					season: 1,
					seasonLimit: json.totalSeasons || 100,
					episode: 1,
					timestamp: '00:00:00',
					type: `${json.Type.charAt(0).toUpperCase()}${json.Type.slice(1)}`,
					link: '',
					misc: {
						watchLater: false
					}
				}, json]
			}
		}
	}

	function add() {
		if (!value && !imdbID || notfound) {
			alert('Please provide a title or an imdb ID.');
			return;
		}
		media.id = mediaDetails.id = Date.now();
		MediaStore.update(store => [media, ...store]);
		MediaDetailsStore.update(store => [mediaDetails, ...store]);
		resetLocalState();
		current.set('home');
	}

	const resetLocalState = () => [found, notfound, media, mediaDetails, value, imdbID] = [false, false, {}, {}, '', ''];
</script>

<main class="h-screen fixed w-full mx-auto flex flex-col justify-evenly items-center pb-20">
	<form on:submit|preventDefault={add}>
		{#if !advanced}
			<input
			class="shadow-md h-12 rounded-md px-4"
			type="text"
			placeholder="Find e.g. The Office"
			bind:value on:input={find}
			class:notfound class:found>
		{:else}
			<input
			class="shadow-md h-12 rounded-md px-4"
			type="text"
			placeholder="Imdb id e.g. tt0386676"
			bind:value={imdbID} on:input={find}
			class:notfound class:found>
		{/if}
		<input  class="mx-8" title="Search by ID" type="checkbox" bind:checked={advanced}>
		<button class="h-12 w-12 shadow-lg rounded-full hover:bg-black hover:text-white" type='submit'><i class="fas fa-check"></i></button>
	</form>
		<p>Selected: <span>{media.title || 'N/A'}</span></p>
		<section>
			<img class="h-64 shadow-2xl rounded-md cursor-pointer" title='{media.title || 'Poster'}' alt='{media.title || 'Poster'}' src="{media.poster || 'https://via.placeholder.com/300x453'}">
		</section>
</main>