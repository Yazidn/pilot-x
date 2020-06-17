<script>
	import {MediaStore, Preferences} from '../stores.js';
	let displayEditor = $Preferences.displayEditor;
	let displayType = $Preferences.displayType;

	import Details from './Details.svelte';
	let showDetails = false;

	import Editor from './Editor.svelte';

	export let id, type, title, poster, season, seasonLimit, episode, timestamp, link, misc;
	$: watchLater = misc.watchLater;

	let episodeEditMode = false;
	let timestampEditMode = false;

	function updateEpisode() {
		episodeEditMode = false;
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			media.episode = episode;
			return store;
		})
	}

	function updateTimestamp() {
		timestampEditMode = false;
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			media.timestamp = timestamp;
			return store;
		})
	}
</script>

<main class="shadow-2xl rounded-md bg-cover transform hover:-translate-y-2 transition-transform duration-300	" style='background-image: url({poster})'>
	<section class="flex flex-col justify-between bg-opacity-25 text-white bg-black h-full p-4">
		<div>
		
			{#if watchLater}
				<p>Watch later</p>
			{/if}

			{#if displayType}
				<p>{type}</p>
			{/if}

			<h1 class="cursor-pointer" on:click={() => showDetails = true}>{title}</h1>

			{#if type === 'Series'}
				<h3>Season {season}</h3>

				{#if episodeEditMode}
					<input type="number" bind:value={episode} on:blur={updateEpisode} autofocus>
				{:else}
					<h2 on:click={() => episodeEditMode = true}>{episode}</h2>
				{/if}
			{/if}

			{#if timestampEditMode}
				<input type='text' bind:value={timestamp} step='1' on:blur={updateTimestamp} autofocus>
			{:else}
				<h4 on:click={() => timestampEditMode = true}>{timestamp}</h4>
			{/if}
		</div>

		{#if displayEditor}
			<Editor {id}/>
		{/if}
	</section>
</main>

{#if showDetails}
	<Details {id} {season} {episode} {title} {link} {misc} on:hideDetails={() => showDetails = false}/>
{/if}