<script>
	import {MediaStore, MediaDetailsStore} from '../../stores.js';
	import Media from '../media.svelte';
	
</script>

<main class="cards p-8">
	{#each $MediaStore as media (media.id)}
		<Media {...media}/>
	{:else}
		<p>You're not watching anything at the moment.</p>
	{/each}
</main>