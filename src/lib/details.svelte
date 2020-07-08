<script>
  import { key } from "../env.js";
  import { MediaStore, MediaDetailsStore } from "../stores.js";
  import { createEventDispatcher } from "svelte";
  import Editor from "./editor.svelte";
  import { scale, fade } from 'svelte/transition';
  import { Preferences } from "../stores.js";


  const dispatch = createEventDispatcher();
  export let id, season, episode, title, link, misc, timestamp, type;
  $: watchLater = misc.watchLater;

  // GET MEDIA DETAILS, LOCALLY, IF NOT FOUND (DUE TO MEDIA BEING IMPORTED), FETCH FROM SOURCE.
  const MEDIA = new Promise((resolve, reject) =>
    resolve($MediaDetailsStore.find(m => m.id === id) || fetchMediaDetails())
  );

  // FETCH FROM SOURCE
  async function fetchMediaDetails() {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&t=${title}`
    );
    const media = await response.json();
    MediaDetailsStore.update(store => [{ id, ...media }, ...store]);
    return media;
  }
</script>

<!-- MODAL BACKGROUND (DIMMED, BLURRED OR LIGHTENED AREA) -->
<main
  transition:fade
  class="flex md:items-center justify-center fixed bg-{$Preferences.modalBackground} z-20 top-0 left-0 h-full w-full"
  on:click|self={() => dispatch('hideDetails')}>
  
  <!-- MODAL -->
  <div
    transition:scale
    class="h-full w-screen  md:h-auto lg:w-1/2 max-w-lg bg-white
    rounded-lg md:shadow-xl p-8 overflow-y-auto">

    <aside class="leading-none">

      <!-- EDITOR -->
      <Editor {id} fullEditor={true} {link} {watchLater} {title} {type} on:hideDetails/>

      <!-- IF NOT WATCH LATER, THEN SHOW PROGRESS (SEASON, EPISODE AND TIMESTAMP) -->
      {#if !watchLater}

        <!-- IF MOVIE, HIDE SEASON AND EPISODE -->
        {#if type === 'Series'}
          <h3 class="text-xl font-thin">Season {season}</h3>
          <h2 class="text-3xl font-thin my-2">Episode {episode}</h2>
        {/if}

        <!-- TIMESTAMP VALID FOR BOTH TV-SHOWS AND MOVIES -->
        <h2 class="text-lg font-thin mb-8 {type !== 'Series' ? 'text-2xl': ''}">{timestamp}</h2>
      {/if}

    </aside>

    <div class="flex">
      <!-- LOAD DETAILS LOCALLY OR FROM SOURCE -->
      {#await MEDIA}
        <!-- PLACEHOLDER UNTIL MEDIA DETAILS ARE LOADED -->
        <img
          class="h-20"
          src="https://via.placeholder.com/300x453"
          title="Placeholder"
          alt="Placeholder Poster" />

        <section class="ml-4">
          <h3 class="text-xl">Details</h3>
          <p>Loading...</p>
          <p>
            <span class="font-bold">Cast:</span>
            Loading...
          </p>
          <p>
            <span class="font-bold">Genre:</span>
            Loading...
          </p>
          <p>
            <span class="font-bold">Plot:</span>
            Loading...
          </p>
          <p>
            <span class="font-bold">Year:</span>
            Loading...
          </p>
          <p>
            <span class="font-bold">Runtime:</span>
            Loading...
          </p>
        </section>
      {:then media}
        <!-- POSTER -->
        <img
          class="h-20 rounded-md"
          src={media.Poster}
          title="Poster of {media.Title}"
          alt="Poster of {media.Title}" />

        <!-- INFORMATION WRAPPER -->
        <section class="ml-4">
          <!-- MEDIA TITLE -->
          <p class="text-3xl font-thin">{media.Title}</p>
          <p>
            <span class="font-bold">Cast:</span>
            {media.Actors}
          </p>
          <p>
            <span class="font-bold">Genre:</span>
            {media.Genre}
          </p>
          <p>
            <span class="font-bold">Plot:</span>
            {media.Plot}
          </p>
          <p>
            <span class="font-bold">Year:</span>
            {media.Year}
          </p>
          <p>
            <span class="font-bold">Runtime:</span>
            {media.Runtime}
          </p>
        </section>
      {/await}
    </div>
  </div>
</main>