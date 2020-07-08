<script>
  import { scale } from "svelte/transition";
  import { MediaStore, Preferences } from "../stores.js";
  import Details from "./details.svelte";
  import Editor from "./editor.svelte";

  // IN-CARD DISPLAY PREFERENCES
  let displayEditor = $Preferences.displayEditor;
  let displayType = $Preferences.displayType;

  // MEDIA DETAILS DISPLAY STATE
  let showDetails = false;

  export let id, type, title, poster, season, episode, timestamp, link, misc;
  $: watchLater = misc.watchLater;

  // IN-CARD TEXT INPUTS DISPLAY STATE
  let episodeEditMode = false;
  let timestampEditMode = false;

  // CONFIRM CHANGES THROUGH TEXT INPUTS, FOR BOTH EPISODE AND TIMESTAMP.
  function updateEpisode() {
    episodeEditMode = false;
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.episode = episode;
      return store;
    });
  }

  function updateTimestamp() {
    timestampEditMode = false;
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.timestamp = timestamp;
      return store;
    });
  }
</script>

<!-- CARD -->
<main
  transition:scale={{ duration: 300 }}
  class="h-full shadow-2xl rounded-md bg-cover transform hover:-translate-y-2
  transition-transform duration-300 overflow-hidden {watchLater ? 'grayscale' : ''}"
  style="background-image: url({poster})">

  <!-- GRADIENT OVERLAY -->
  <section class="flex flex-col justify-between text-white gradient h-full p-4">
    <div>

      <!-- MEDIA TYPE DISPLAY PREFERENCE -->
      {#if displayType}
        <p>
          <i class="fas fa-film" />
          {type}
        </p>
      {/if}

      <!-- WHAT AND HOW TO DISPLAY DEPENDING ON WATCH LATER STATE-->
      {#if watchLater}
        <h1
          class="cursor-pointer hover:text-gray-300"
          on:click={() => (showDetails = true)}>
          <i class="fas fa-clock" />
          {title}
        </h1>
      {:else}
        <h1
          class="cursor-pointer hover:text-gray-300"
          on:click={() => (showDetails = true)}>
          {title}
        </h1>
      {/if}

      <!-- INTERACTIONS WITH TEXT INPUTS DEPENDING ON TYPE AND WATCH LATER STATE -->
      {#if type === 'Series' && !watchLater}

        <!-- ONLY DISPLAY SEASON FOR TV SHOWS, NOT MOVIES -->
        <h3>Season {season}</h3>

        <!-- EPISODE TEXT INPUT FIELD -->
        {#if episodeEditMode}
          <input
            class="pt-8 text-4xl w-full bg-transparent text-center outline-none"
            type="text"
            bind:value={episode}
            on:blur={updateEpisode}
            on:keydown={e => (e.which === 13 || e.which === 27 ? updateEpisode() : '')}
            autofocus />
        {:else}
          <h2
            class="pt-8 text-4xl text-center cursor-pointer hover:text-gray-300"
            on:click={() => (episodeEditMode = true)}>
            {episode}
          </h2>
        {/if}
      {/if}

      <!-- TIMESTAMP TEXT INPUT FIELD -->
      {#if !watchLater}
        {#if timestampEditMode}
          <input
            class="w-full text-center bg-transparent outline-none"
            type="text"
            bind:value={timestamp}
            on:keydown={e => (e.which === 13 || e.which === 27 ? updateTimestamp() : '')}
            on:blur={updateTimestamp}
            autofocus />
        {:else}
          <h4
            class="text-center cursor-pointer hover:text-gray-300"
            on:click={() => (timestampEditMode = true)}>
            {timestamp}
          </h4>
        {/if}
      {/if}

    </div>

    <!-- QUICK EDITOR DISPLAY PREFERENCE -->
    {#if displayEditor && !watchLater}
      <Editor {id} {type}/>
    {/if}
  </section>
</main>

<!-- MEDIA DETAILS MODAL -->
{#if showDetails}
  <Details
    {id}
    {season}
    {episode}
    {title}
    {link}
    {misc}
    {timestamp}
    {type}
    on:hideDetails={() => (showDetails = false)} />
{/if}