<script>
	import {MediaStore, MediaDetailsStore} from '../../stores.js';
	// import Add from '../Add.svelte';
	import Media from '../Media.svelte';
	
</script>


<!-- <Add /> -->
<main class="cards p-8">
	{#each $MediaStore as media (media.id)}
		<Media {...media}/>
	{:else}
		<p>You're not watching anything at the moment.</p>
	{/each}
</main>