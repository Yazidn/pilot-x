<script>
  import { current } from "../router.js";
</script>

<!-- PANEL -->
<main class="fixed inset-x-0 bottom-0 flex justify-center p-10 z-10">
  <!-- BUTTONS WRAPPER -->
  <div class="w-full md:w-3/4 lg:w-2/4 flex justify-evenly">

    <!-- ADD BUTTON -->
    <button
      class="bg-white h-12 w-12 bg-white rounded-full shadow-lg transform
      hover:-translate-y-2 transition-all hover:bg-black hover:text-white
      duration-300"
      on:click={() => current.set('add')}
      title="Add">
      <i class="fas fa-plus" />
    </button>

    <!-- MIDDLE LOGO -->
    <img
      class="h-12 cursor-pointer"
      src="./logo.png"
      alt="logo"
      on:click={() => current.set('home')} />

    <!-- PREFERENCES BUTTON -->
    <button
      class="bg-white h-12 w-12 bg-white rounded-full shadow-lg transform
      hover:-translate-y-2 transition-all hover:bg-black hover:text-white
      duration-300"
      on:click={() => current.set('preferences')}
      title="Preferences">
      <i class="fas fa-sliders-h" />
    </button>
  </div>
</main>