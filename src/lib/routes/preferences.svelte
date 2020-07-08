<script>
  import { Preferences } from "../../stores.js";
  import BackupRestore from "../backup_restore.svelte";
</script>

<!-- USER PREFERENCES -->
<main class="p-8 flex flex-col">
  <!-- HEADINGS -->
  <h1 class="text-4xl my-4">Preferences</h1>
  <h3 class="text-2xl my-4">General</h3>

  <!-- CHECKBOXES -->
  <label>
    <input
      class="m-2"
      type="checkbox"
      bind:checked={$Preferences.advancedSearch} />
    Search by ID
  </label>
  <label>
    <input
      class="m-2"
      type="checkbox"
      bind:checked={$Preferences.displayEditor} />
    Display Quick Editor
  </label>
  <label>
    <input
      class="m-2"
      type="checkbox"
      bind:checked={$Preferences.displayType} />
    Display Type
  </label>

  <!-- MODAL BACKGROUND -->
  <h3 class="text-2xl my-4">Modal background</h3>
  <label>
    <input
      class="m-2"
      type="radio"
      bind:group={$Preferences.modalBackground}
      value='blur'
      />
    Blur
  </label>
  <label>
    <input
      class="m-2"
      type="radio"
      bind:group={$Preferences.modalBackground}
      value='wash'
      />
    Lighten
  </label>
  <label>
    <input
      class="m-2"
      type="radio"
      bind:group={$Preferences.modalBackground}
      value='dim'
      />
    Dim
  </label>

  <!-- BACKUP AND RESTORE -->
  <h1 class="text-4xl my-4">Backup & Restore</h1>
  <BackupRestore />
</main>