<script>
	import {MediaStore, MediaDetailsStore, Config} from '../stores.js';
	import {createEventDispatcher} from 'svelte';
	import Editor from './Editor.svelte';

	const akey = $Config.apiKey;
	const dispatch = createEventDispatcher();
	export let id, season, episode, title, link, misc;
	$: watchLater = misc.watchLater;
	const MEDIA = new Promise((resolve, reject) => resolve($MediaDetailsStore.find(m => m.id === id) || fetchMediaDetails()))

	async function fetchMediaDetails() {
		const response = await fetch(`https://www.omdbapi.com/?apikey=${akey}&t=${title}`);
		const media = await response.json();
		MediaDetailsStore.update(store => [{id, ...media}, ...store])
		return media;
	}
</script>

<main class="fixed top-0 h-full w-full flex z-10 bg-white" on:click|self={() => dispatch('hideDetails')}>
	{#await MEDIA}
		<p>Loading...</p>
	{:then media}
		<img src={media.Poster} title='Poster of {media.Title}' alt='Poster of {media.Title}'>
		<section>
			<h3>Details</h3>
			{#each Object.keys(media) as key}
				{#if key === 'totalSeasons'}
					<p>Seasons: <span>{media[key]}</span></p>
				{:else if key !== 'id' && key !== 'Response' && key !== 'Poster' && key !== 'Ratings'}
					<p>{key}: <span>{media[key]}</span></p>
				{/if}
				{#if key === 'Ratings'}
					<h3>Ratings</h3>
					{#each media[key] as rating}
						<p class="rating">{rating.Source}: <span>{rating.Value}</span></p>
					{/each}
				{/if}
			{/each}
		</section>
		<aside>
			<h3>{season}</h3>
			<h2>{episode}</h2>
			<Editor {id} fullEditor={true} {link} {watchLater} />

			{#if link}
				<a target="_blank" href={link}>Watch {title}</a>
			{/if}
		</aside>
	{/await}
</main>