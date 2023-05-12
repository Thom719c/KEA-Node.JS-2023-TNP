<script>
  import { onMount } from "svelte";
  import { BASE_URL, myUsername } from "./stores/globalStore.js";

  onMount(async () => {
    const response = await fetch($BASE_URL + "/users/me", {
      credentials: "include"
    });
    const result = await response.json();
    myUsername.set(result.data);
  });

  import Colors from "./pages/Colors/Colors.svelte";
  import Register from "./pages/Register/Register.svelte";
    import ChoosenColorsList from "./components/ChoosenColorsList/ChoosenColorsList.svelte";
</script>

<main>
  <h1>Svelte Sockets</h1>
  {#if $myUsername}
    <Colors />
    <ChoosenColorsList />
  {:else}
    <Register />
  {/if}
</main>
