<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "./store/urlDomain";
  import Home from "./components/Home/Home.svelte";
  import Pibling from "./components/Pibling/Pibling.svelte";

  /* onMount(async () => {
    const response = await fetch(`${$BASE_URL}/piblings`);
    const piblingsResponse = await response.json();
    console.log(piblingsResponse);
  }); */

  onMount(async () => {
    const registerURL = `${$BASE_URL}/gotham/batman?hobby=Catching the bad guys.`;
    const response = await fetch(registerURL, {
      credentials: "include"
    });
    const batmanRegisteredResponse = await response.json();
    console.log(batmanRegisteredResponse);

    const registeredResponder = await fetch(`${$BASE_URL}/gotham`, {
      credentials: "include"
    });
    const registeredResponseMessage = await registeredResponder.json();
    console.log(registeredResponseMessage);
  });

  const piblings = ["John", "Mark"];
  const niblings = [
    {
      id: 1,
      name: "Ann",
      isGirl: true,
      cookies: [],
      money: 0,
    },
    {
      id: 2,
      name: "Amelie",
      isGirl: true,
      blackSheep: "medium-black-sheep",
      cookies: [],
      money: 0,
    },
    {
      id: 3,
      name: "Peter",
      blackSheep: "ultra-black-sheep",
      cookies: [],
      money: 0,
    },
  ];
</script>

<Home>
  <h3>This is the home of the Svelte Family.</h3>
  <Pibling name={piblings[0]} {niblings} />
  <Pibling name={piblings[1]} {niblings} />
</Home>
