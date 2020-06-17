<script>
	import {MediaStore, MediaDetailsStore} from '../stores.js';

	export let id, watchLater = false;
	export let fullEditor = false, link = '';

	function setWatchLater() {
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			media.misc.watchLater = watchLater;
			return store;
		})
	}

	let displaySetLink = false;
	function setLink() {
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			media.link = link;
			return store;
		})
		displaySetLink = false;
	}
	function editEpisode(next) {
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			if (next) media.episode++;
			else if (media.episode >= 1) media.episode--;
			return store;
		})
	}
	function editSeason(next) {
		MediaStore.update(store => {
			const media = store.find(m => m.id === id);
			if (next) {
				if (media.season < media.seasonLimit) {
					media.season++;
					media.episode = 1;
				} else alert(`${media.title} has ${media.seasonLimit} ${media.seasonLimit == 1 ? 'season' : 'seasons'}.`)
			} else if (media.season >= 1) media.season--;
			return store;
		})
	}
	function removeMedia() {
		MediaStore.update(store => store.filter(m => m.id !== id))
		MediaDetailsStore.update(store => store.filter(m => m.id !== id))
	}
</script>

<main class="flex justify-evenly">
	{#if fullEditor}
		<button on:click={removeMedia} title='Remove'><i class="fas fa-trash-alt"></i></button>
		<button on:click={() => editEpisode(true)} title='Next Episode'><i class="fas fa-angle-right"></i></button>
		<button on:click={() => editSeason(true)} title='Next Season'><i class="fas fa-angle-double-right"></i></button>
		<button on:click={() => editEpisode(false)} title='Previous Episode'><i class="fas fa-angle-left"></i></button>
		<button on:click={() => editSeason(false)} title='Previous Season'><i class="fas fa-angle-double-left"></i></button>

		<label><input type="checkbox" bind:checked={displaySetLink}> Set link</label>
		{#if displaySetLink}
			<section>
				<input type="url" placeholder="Link to watch" bind:value={link}>
				<button on:click={setLink}>Set</button>
			</section>
		{/if}

		<label><input type="checkbox" bind:checked={watchLater} on:change={setWatchLater}> Watch later</label>
	{:else}
		<button on:click={removeMedia} title='Remove'><i class="fas fa-trash-alt"></i></button>
		<button on:click={() => editEpisode(true)} title='Next Episode'><i class="fas fa-angle-right"></i></button>
		<button on:click={() => editSeason(true)} title='Next Season'><i class="fas fa-angle-double-right"></i></button>
	{/if}
</main>