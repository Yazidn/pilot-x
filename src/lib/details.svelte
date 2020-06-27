<script>
  import { key } from "../env.js";
  import { MediaStore, MediaDetailsStore } from "../stores.js";
  import { createEventDispatcher } from "svelte";
  import Editor from "./editor.svelte";
  import { scale, fade } from 'svelte/transition';


  const dispatch = createEventDispatcher();
  export let id, season, episode, title, link, misc;
  $: watchLater = misc.watchLater;
  const MEDIA = new Promise((resolve, reject) =>
    resolve($MediaDetailsStore.find(m => m.id === id) || fetchMediaDetails())
  );

  async function fetchMediaDetails() {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&t=${title}`
    );
    const media = await response.json();
    MediaDetailsStore.update(store => [{ id, ...media }, ...store]);
    return media;
  }
</script>

<main
  transition:fade
  class="flex md:items-center justify-center p-8 fixed bg-white md:bg-transparent blur z-20 top-0 left-0 h-full w-full"
  on:click|self={() => dispatch('hideDetails')}>
  <div
    transition:scale
    class="h-100 w-full mx-auto sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-lg bg-white
    rounded-lg md:shadow-xl md:p-8 overflow-y-auto">

    <aside class="leading-none">

      <Editor {id} fullEditor={true} {link} {watchLater} {title} />

      {#if !watchLater}
        <h3 class="text-xl font-thin">Season {season}</h3>
        <h2 class="text-4xl mb-8 font-thin">Episode {episode}</h2>
      {/if}

    </aside>

    <div class="flex">
      {#await MEDIA}
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
        <img
          class="h-20 rounded-md"
          src={media.Poster}
          title="Poster of {media.Title}"
          alt="Poster of {media.Title}" />

        <section class="ml-4">
          <!-- <h3 class="text-xl">Details</h3> -->
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