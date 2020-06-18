<script>
	import {Preferences} from '../../stores.js';
	import BackupRestore from '../backup_restore.svelte';
</script>

<main class="p-8 flex flex-col">
	<h1 class="text-4xl my-4">Preferences</h1>
	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.advancedSearch}> Search by ID</label>
	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.displayEditor}> Display Quick Editor</label>
	<label><input class="m-2" type="checkbox" bind:checked={$Preferences.displayType}> Display Type</label>

	<h1 class="text-4xl my-4">Backup & Restore</h1>
	<BackupRestore />
</main>