<script>
  import { MediaStore, MediaDetailsStore } from "../stores.js";
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  // EDITOR COMPONENT PROPERTIES
  export let id, type,
    watchLater = false;
  export let fullEditor = false,
    link = "",
    title = "";

  // SET MEDIA AS WATCH LATER
  function setWatchLater() {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.misc.watchLater = watchLater;
      return store;
    });
    dispatch('hideDetails');
  }

  // WHETHER TO SHOW INPUT TO SET A LINK OR NOT, BOUND TO A CHECKBOX.
  let displaySetLink = false;

  // SAVE LINK FOR MEDIA
  function setLink() {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      media.link = link;
      return store;
    });
    displaySetLink = false;
  }

  // EDIT MEDIA EPISODE PROGRESS
  function editEpisode(next) {
    MediaStore.update(store => {
      const media = store.find(m => m.id === id);
      if (next) media.episode++;
      else if (media.episode >= 1) media.episode--;
      media.timestamp = '00:00:00';
      return store;
    });
  }

  // EDIT MEDIA SEASON PROGRESS
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
      media.timestamp = '00:00:00';
      return store;
    });
  }

  // REMOVE MEDIA
  function removeMedia() {
    MediaStore.update(store => store.filter(m => m.id !== id));
    MediaDetailsStore.update(store => store.filter(m => m.id !== id));
  }
</script>

<main>
  {#if fullEditor}
    <!-- DETAILS EDITOR (FULL EDITOR WITH ALL AVAILABLE BUTTONS) -->
    <div class="flex flex-col mb-8">

      <!-- IF NOT SET FOR WATCH LATER, DISPLAY FOLLOWING -->
      {#if !watchLater}

        <!-- EDITOR BUTTONS -->
        <div class="flex justify-{type === 'Series' ? 'between':'evenly'} mb-8">

          <!-- IF A LINK IS SET, DISPLAY BUTTON TO FOLLOW LINK -->
          {#if link}

            <!-- BUTTON TO FOLLOW LINK -->
            <a target="_blank" href={link} title="Watch {title}">
              <button
                class="h-12 w-12 shadow-lg rounded-full hover:bg-blue-500
                hover:text-white">
                <i class="fas fa-tv"/>
              </button>
            </a>
          {/if}
          
          <!-- ONLY DISPLAY SEASON AND EPISODE RELATED BUTTONS IF IT'S A TV SHOW, NOT FOR MOVIES -->
          {#if type === 'Series'}

          <!-- NEXT EPISODE BUTTON -->
          <button
            class="h-12 w-12 shadow-lg rounded-full hover:bg-green-500
            hover:text-white"
            on:click={() => editEpisode(true)}
            title="Next Episode">
            <i class="fas fa-angle-right" />
          </button>
          
          <!-- NEXT SEASON BUTTON -->
          <button
            class="h-12 w-12 shadow-lg rounded-full hover:bg-green-500
            hover:text-white"
            on:click={() => editSeason(true)}
            title="Next Season">
            <i class="fas fa-angle-double-right" />
          </button>

          <!-- PREVIOUS EPISODE BUTTON -->
          <button
            class="h-12 w-12 shadow-lg rounded-full hover:bg-yellow-400"
            on:click={() => editEpisode(false)}
            title="Previous Episode">
            <i class="fas fa-angle-left" />
          </button>

          <!-- PREVIOUS SEASON BUTTON -->
          <button
            class="h-12 w-12 shadow-lg rounded-full hover:bg-yellow-400"
            on:click={() => editSeason(false)}
            title="Previous Season">
            <i class="fas fa-angle-double-left" />
          </button>
          {/if}

          <!-- REMOVE MEDIA BUTTON -->
          <button
            class="h-12 w-12 shadow-lg rounded-full hover:bg-red-500
            hover:text-white"
            on:click={removeMedia}
            title="Remove">
            <i class="fas fa-trash-alt" />
          </button>
        </div>
      {/if}

      <!-- EDITOR CHECKBOXES -->
      <!-- WATCH LATER CHECK BOX -->
      <label>
        <input
          class="m-2"
          type="checkbox"
          bind:checked={watchLater}
          on:change={setWatchLater} />
        <i class="fas fa-clock" />
        Later
      </label>

      <!-- DISPLAY INPUT TO SET LINK CHECKBOX -->
      {#if !watchLater}
        <label>
          <input class="m-2" type="checkbox" bind:checked={displaySetLink} />
          <i class="fas fa-link" />
          Link
        </label>
      {/if}

      <!-- LINK EDITOR (LINK TEXT INPUT) -->
      {#if displaySetLink}
        <section class="flex w-full mt-4">

          <!-- LINK TEXT INPUT -->
          <input
            class="mr-2 flex-grow shadow-md h-12 rounded-md px-4"
            type="url"
            placeholder="Link to watch"
            bind:value={link}
            on:keydown={e => (e.which === 13 || e.which === 27 ? setLink() : '')} />

          <!-- SET LINK BUTTON -->
          <button
            class="ml-2 h-12 w-12 shadow-lg rounded-full hover:bg-black
            hover:text-white"
            on:click={setLink}>
            <i class="fas fa-check" />
          </button>
        </section>
      {/if}

    </div>
  {:else}
    <!-- QUICK EDITOR (SHOWS UP IN MEDIA CARDS, NOT ON THE DETAILS MODAL)-->
    <div class="flex justify-evenly">

      <!-- REMOVE BUTTON -->
      <button on:click={removeMedia} title="Remove">
        <i class="fas fa-trash-alt" />
      </button>

      <!-- ONLY SHOW SEASON AND EPISODE RELATED CONTROLS FOR TV-SHOWS AND NOT MOVIES -->
      {#if type === 'Series'}
      <!-- NEXT EPISODE BUTTON -->
      <button on:click={() => editEpisode(true)} title="Next Episode">
        <i class="fas fa-angle-right" />
      </button>

      <!-- NEXT SEASON BUTTON -->
      <button on:click={() => editSeason(true)} title="Next Season">
        <i class="fas fa-angle-double-right" />
      </button>
      {/if}

    </div>
  {/if}
</main>