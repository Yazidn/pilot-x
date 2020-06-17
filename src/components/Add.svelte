<script>
	import {MediaStore, MediaDetailsStore, Config, Preferences} from '../stores.js';
	
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
	}

	const resetLocalState = () => [found, notfound, media, mediaDetails, value, imdbID] = [false, false, {}, {}, '', ''];
</script>

<main>
	<form on:submit|preventDefault={add}>
		{#if !advanced}
			<input
			type="text"
			placeholder="Find e.g. The Office"
			bind:value on:input={find}
			class:notfound class:found autofocus>
		{:else}
			<input
			type="text"
			placeholder="Imdb id e.g. tt0386676"
			bind:value={imdbID} on:input={find}
			class:notfound class:found>
		{/if}
		<label><input type="checkbox" bind:checked={advanced}> Search by ID</label>
		<button type='submit'>Add</button>
	</form>

	<!-- {#if value} -->
		<section>
			<img title='{media.title || 'Poster'}' alt='{media.title || 'Poster'}' src="{media.poster || '/default.jpg'}">
			<p>Selected: <span>{media.title || 'N/A'}</span></p>
		</section>
	<!-- {/if} -->
</main>