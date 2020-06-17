<script>
	import { key } from '../env.js';
	import {MediaStore, MediaDetailsStore} from '../stores.js';
	import {createEventDispatcher} from 'svelte';
	import Editor from './Editor.svelte';

	const dispatch = createEventDispatcher();
	export let id, season, episode, title, link, misc;
	$: watchLater = misc.watchLater;
	const MEDIA = new Promise((resolve, reject) => resolve($MediaDetailsStore.find(m => m.id === id) || fetchMediaDetails()))

	async function fetchMediaDetails() {
		const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&t=${title}`);
		const media = await response.json();
		MediaDetailsStore.update(store => [{id, ...media}, ...store])
		return media;
	}
</script>

<main class="p-8 fixed z-20 bg-white top-0 right-0 bottom-0 left-0 flex justify-between" on:click|self={() => dispatch('hideDetails')}>
	{#await MEDIA}
		<p>Loading...</p>
	{:then media}
		<div>
			<img class="shadow-2xl rounded-md" src={media.Poster} title='Poster of {media.Title}' alt='Poster of {media.Title}'>
		</div>

		<section class="px-4 w-2/4">
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

		<aside class="px-8">
			<h3 class="text-xl font-thin">Season {season}</h3>
			<h2 class="text-2xl">Episode {episode}</h2>

			<Editor {id} fullEditor={true} {link} {watchLater} />

			{#if link}
				<a target="_blank" href={link}>Watch {title}</a>
			{/if}
		</aside>

	{/await}
</main>