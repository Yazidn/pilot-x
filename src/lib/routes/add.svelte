<script>
  import { key } from "../../env.js";
  import { MediaStore, MediaDetailsStore, Preferences } from "../../stores.js";
  import { current } from "../../router.js";

  let media = {},
    mediaDetails = {},
    value = "",
    found,
    notfound,
    imdbID = "";
  
  // WHETHER TO SEARCH BY ID BY DEFAULT
  let advanced = $Preferences.advancedSearch;

  // SEARCH FOR SHOW/MOVIE AND "SELECT" IT.
  async function find() {
    let url = `https://www.omdbapi.com/?apikey=${key}${
      value ? `&t=${value}` : ``
    }${imdbID ? `&i=${imdbID}` : ``}`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      if (json.Response === "False") {
        [found, notfound] = [false, true];
        if (value === "" && imdbID === "") resetLocalState();
      } else {
        [found, notfound] = [true, false];
        [media, mediaDetails] = [
          {
            title: json.Title,
            poster: json.Poster,
            season: 1,
            seasonLimit: json.totalSeasons || 100,
            episode: 1,
            timestamp: "00:00:00",
            type: `${json.Type.charAt(0).toUpperCase()}${json.Type.slice(1)}`,
            link: "",
            misc: {
              watchLater: false
            }
          },
          json
        ];
      }
    }
  }

  // ADD SELECTED MEDIA TO STORAGE
  function add() {
    if ((!value && !imdbID) || notfound) {
      alert("Please provide a title or an imdb ID.");
      return;
    }
    media.id = mediaDetails.id = Date.now();
    MediaStore.update(store => [media, ...store]);
    MediaDetailsStore.update(store => [mediaDetails, ...store]);
    resetLocalState();
    current.set("home");
  }

  // RESET COMPONENT STATE
  const resetLocalState = () =>
    ([found, notfound, media, mediaDetails, value, imdbID] = [
      false,
      false,
      {},
      {},
      "",
      ""
    ]);
</script>

<main
  class="h-screen fixed w-full mx-auto flex flex-col justify-evenly items-center
  pb-20">
  <form on:submit|preventDefault={add}>
    {#if !advanced}
      <!-- SEARCH BY TITLE TEXT INPUT -->
      <input
        class="shadow-md h-12 rounded-md px-4"
        type="text"
        placeholder="Find e.g. The Office"
        bind:value
        on:input={find}
        class:notfound
        class:found />
    {:else}
      <!-- SEARCH BY ID TEXT INPUT -->
      <input
        class="shadow-md h-12 rounded-md px-4"
        type="text"
        placeholder="Imdb id e.g. tt0386676"
        bind:value={imdbID}
        on:input={find}
        class:notfound
        class:found />
    {/if}
    <!-- CHECKBOX FOR SEARCH BY TITLE OR ID -->
    <input
      class="mx-8"
      title="Search by ID"
      type="checkbox"
      bind:checked={advanced} />
    
    <!-- ADD MEDIA TO LIST BUTTON -->
    <button
      class="h-12 w-12 shadow-lg rounded-full hover:bg-black hover:text-white"
      type="submit">
      <i class="fas fa-check" />
    </button>
  </form>

  <!-- VISUAL FEEDBACK WHEN SEARCHING AND SELECTING -->
  <p>
    Selected:
    <span>{media.title || 'N/A'}</span>
  </p>
  <section>
    <img
      class="h-64 shadow-2xl rounded-md cursor-pointer"
      title={media.title || 'Poster'}
      alt={media.title || 'Poster'}
      src={media.poster || 'https://via.placeholder.com/300x453'} />
  </section>
</main>