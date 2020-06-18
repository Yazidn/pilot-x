<script>
  import { MediaStore, MediaDetailsStore } from "../../stores.js";
  import Media from "../media.svelte";
  import { flip } from 'svelte/animate';
</script>

<main class="cards p-8">
  {#each $MediaStore as media (media.id)}
    <div animate:flip={{duration: 700}}>
      <Media {...media} />
    </div>
  {:else}
    <p>You're not watching anything at the moment.</p>
  {/each}
</main>