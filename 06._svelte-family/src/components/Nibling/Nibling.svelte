<script>
    export let nibling;
    export let onShowLove;
    export let piblingName;
    export let onGiveAllowance;
    export let onEatCookie;

    import { fridgeMessages } from "../../store/fridgeMessages.js";

    let fridgeMessage = "";

    function handleWriteFridgeMessage() {
        console.log(fridgeMessage);
        // $fridgeMessages.push(fridgeMessage);
        // fridgeMessages.set($fridgeMessages);
        fridgeMessages.update((currentFridgeMessages) => {
            $fridgeMessages.push(fridgeMessage);
            console.log(currentFridgeMessages)
            return currentFridgeMessages;
        })
        fridgeMessage = "";
    }
</script>

<div class:is-girl={nibling.isGirl}
    class:is-boy={!nibling.isGirl}
    class={nibling.blackSheep || "not-a-black-sheep"}>
    {#if nibling.isGirl}
        <p>Niece: {nibling.name}.</p>
    {:else}
        <p>Nephew: {nibling.name}.</p>
    {/if}
</div>

<p>{nibling.cookies}</p>

<button
    on:click={() =>
        onShowLove(
            `Hey ${piblingName}, It's me ${nibling.name} and I love you.`
        )}>Show Love</button
>

<button on:click={() => onEatCookie()}>Eat a cookie</button>

<button
    on:click={() =>
        onGiveAllowance(
            `Hey ${piblingName}, It's me ${nibling.name}, can i please have some money?`
        )}>Ask for money</button
>

<p>There are {$fridgeMessages.length} messages on the fridge.</p>
<input bind:value={fridgeMessage}>
<button on:click={handleWriteFridgeMessage}>Write a message on the fridge.</button>


<style>
    .is-girl {
        border: 3px solid blue;
    }

    .is-boy {
        border: 3px solid pink;
    }

    .not-a-black-sheep {
        background-color: aliceblue;
        color: black;
    }

    .medium-black-sheep {
        background-color: burlywood;
    }

    .ultra-black-sheep {
        background-color: brown;
    }
</style>
