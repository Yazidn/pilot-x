<script>
  import { MediaStore, MediaDetailsStore } from "../../stores.js";
  import Media from "../media.svelte";
  import { flip } from "svelte/animate";

  // SORT MEDIA LIST BY WATCH LATER STATE
  $: sortedMediaStore = $MediaStore.sort((f, s) =>
    f.misc.watchLater === s.misc.watchLater ? 0 : f.misc.watchLater ? 1 : -1
  );
</script>

<!-- MEDIA LIST CONTAINER -->
<main class="cards p-8">
  <!-- USING A WRAPPER FOR THE MEDIA COMPONENT INSIDE THE LOOP TO SUPPORT SVELTE ANIMATIONS -->
  {#each sortedMediaStore as media (media.id)}
    <div animate:flip={{ duration: 300, delay: 600 }}>
      <Media {...media} />
    </div>
  {:else}
    <p>You're not watching anything at the moment.</p>
  {/each}
</main>