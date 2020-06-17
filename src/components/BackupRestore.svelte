<script>
	import {current} from '../router.js';

	import {MediaStore} from '../stores.js';
	function download (content, fileName, contentType) {
		let a = document.createElement("a");
		let file = new Blob([content], {type: contentType});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}

	function fileHandler() {
		let loadedFile = event.target.files[0]; 
		if (loadedFile) {
			const reader = new FileReader();
			reader.onload = e => MediaStore.set(JSON.parse(e.target.result));
			reader.readAsText(loadedFile);
			current.set('home');
		} else alert("Couldn't load file. Please try again.");
	}
</script>

<main class="flex justify-between">
	<button class="w-full p-4 shadow-md rounded-md mr-4" on:click={() => download(JSON.stringify($MediaStore), `Pilot - ${new Date().toLocaleString()}.json`, 'text/plain')}>Backup</button>
	<button class="w-full p-4 shadow-md rounded-md ml-4" on:click={() => document.querySelector('#file').click()}>Restore</button>
</main>
<input style="display: none" id="file" type="file" on:change={fileHandler}/> 