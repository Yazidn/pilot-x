<script>
	import {Preferences} from '../../stores.js';
</script>

<main class="p-8 flex flex-col">
	<h1 class="text-4xl mb-4">Preferences</h1>

	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.advancedSearch}> Search by ID</label>
	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.displayEditor}> Display Quick Editor</label>
	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.displayType}> Display Type</label>
</main>