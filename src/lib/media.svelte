<script>
  import { scale } from "svelte/transition";

  import { MediaStore, Preferences } from "../stores.js";
  let displayEditor = $Preferences.displayEditor;
  let displayType = $Preferences.displayType;

  import Details from "./details.svelte";
  let showDetails = false;

  import Editor from "./editor.svelte";

  export let id, type, title, poster, season, episode, timestamp, link, misc;

  $: watchLater = misc.watchLater;

  let episodeEditMode = false;
  let timestampEditMode = false;

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

<main
  transition:scale={{ duration: 300 }}
  class="h-full shadow-2xl rounded-md bg-cover transform hover:-translate-y-2
  transition-transform duration-300 overflow-hidden {watchLater ? 'grayscale' : ''}"
  style="background-image: url({poster})">
  <section class="flex flex-col justify-between text-white gradient h-full p-4">
    <div>

      {#if displayType}
        <p>
          <i class="fas fa-film" />
          {type}
        </p>
      {/if}

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

      {#if type === 'Series' && !watchLater}
        <h3>Season {season}</h3>

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

    {#if displayEditor && !watchLater}
      <Editor {id} />
    {/if}
  </section>
</main>

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