<script>
  import { current } from "../router.js";
  import { MediaStore } from "../stores.js";

  // TRIGGER DOWNLOAD
  function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  // HANDLE FILE ON LOAD
  function fileHandler() {
    let loadedFile = event.target.files[0];
    if (loadedFile) {
      const reader = new FileReader();
      reader.onload = e => MediaStore.set(JSON.parse(e.target.result));
      reader.readAsText(loadedFile);
      current.set("home");
    } else alert("Couldn't load file. Please try again.");
  }
</script>

<!-- UI -->
<main>
  <!-- EXPORT BUTTON -->
  <p
    class="cursor-pointer hover:text-blue-700"
    on:click={() => download(JSON.stringify($MediaStore), `Pilot - ${new Date().toLocaleString()}.json`, 'text/plain')}>
    <i class="fas fa-upload m-2" />
    Export to file
  </p>

  <!-- IMPORT BUTTON -->
  <p
    class="cursor-pointer hover:text-blue-700"
    on:click={() => document.querySelector('#file').click()}>
    <i class="fas fa-download m-2" />
    Import from file
  </p>
</main>

<!-- NATIVE HTML FILE INPUT DIALOG -->
<input style="display: none" id="file" type="file" on:change={fileHandler} />