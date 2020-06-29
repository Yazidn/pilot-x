<script>
  import Navigation from "./lib/navigation.svelte";
  import router, { current } from "./router.js";
  import { MediaStore, MediaDetailsStore, Preferences } from "./stores.js";
</script>

<Navigation />
<main class="pb-20">
  <svelte:component this={router[$current]} />
</main>