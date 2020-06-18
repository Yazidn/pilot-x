<script>
  import { MediaStore, MediaDetailsStore } from "../stores.js";

  export let id,
    watchLater = false;
  export let fullEditor = false,
    link = "";

  function setWatchLater() {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.misc.watchLater = watchLater;
      return store;
    });
  }

  let displaySetLink = false;
  function setLink() {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.link = link;
      return store;
    });
    displaySetLink = false;
  }
  function editEpisode(next) {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      if (next) media.episode++;
      else if (media.episode >= 1) media.episode--;
      return store;
    });
  }
  function editSeason(next) {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      if (next) {
        if (media.season < media.seasonLimit) {
          media.season++;
          media.episode = 1;
        } else
          alert(
            `${media.title} has ${media.seasonLimit} ${
              media.seasonLimit == 1 ? "season" : "seasons"
            }.`
          );
      } else if (media.season >= 1) media.season--;
      return store;
    });
  }
  function removeMedia() {
    MediaStore.update(store => store.filter(m => m.id !== id));
    MediaDetailsStore.update(store => store.filter(m => m.id !== id));
  }
</script>

<main>
  {#if fullEditor}
    <div class="flex flex-col my-4">
        <label>
        <input
          class="m-2"
          type="checkbox"
          bind:checked={watchLater}
          on:change={setWatchLater} />
        <i class="fas fa-clock" /> Later
      </label>

        <label>
        <input class="m-2" type="checkbox" bind:checked={displaySetLink} />
        <i class="fas fa-link"></i> Link
      </label>
      {#if displaySetLink}
        <section class="flex w-full">
          <input class="mr-2 flex-grow shadow-md h-12 rounded-md px-4" type="url" placeholder="Link to watch" bind:value={link} on:keydown={e => (e.which === 13 || e.which === 27 ? setLink() : '')}/>
          <button class="ml-2 h-12 w-12 shadow-lg rounded-full hover:bg-black hover:text-white" on:click={setLink}><i class="fas fa-check" /></button>
        </section>
      {/if}

      <div class="flex mt-4">
      <button
        class="mr-2 w-full px-2 my-2 bg-green-600 text-white rounded-md"
        on:click={() => editEpisode(true)}
        title="Next Episode">
        <i class="fas fa-angle-right" />
        Next Episode
      </button>
      <button
        class="ml-2 w-full px-2 my-2 bg-green-600 text-white rounded-md"
        on:click={() => editSeason(true)}
        title="Next Season">
        <i class="fas fa-angle-double-right" />
        Next Season
      </button>
      </div>

      <div class="flex">
        <button
          class="mr-2 w-full  px-2 my-2 bg-yellow-400 rounded-md"
          on:click={() => editEpisode(false)}
          title="Previous Episode">
          <i class="fas fa-angle-left" />
          Previous Episode
        </button>
        <button
          class="ml-2 w-full px-2 my-2 bg-yellow-400 rounded-md"
          on:click={() => editSeason(false)}
          title="Previous Season">
          <i class="fas fa-angle-double-left" />
          Previous Season
        </button>
      </div>
      <button
        class="px-2 my-2 bg-red-600 text-white rounded-md"
        on:click={removeMedia}
        title="Remove">
        <i class="fas fa-trash-alt" />
        Remove
      </button>





    </div>
  {:else}
    <div class="flex justify-evenly">
      <button on:click={removeMedia} title="Remove">
        <i class="fas fa-trash-alt" />
      </button>
      <button on:click={() => editEpisode(true)} title="Next Episode">
        <i class="fas fa-angle-right" />
      </button>
      <button on:click={() => editSeason(true)} title="Next Season">
        <i class="fas fa-angle-double-right" />
      </button>
    </div>
  {/if}
</main>