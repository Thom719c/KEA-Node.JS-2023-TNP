<script>
    import Nibling from "../Nibling/Nibling.svelte";

    export let name;
    export let niblings = [];

    function handleShowLove(message) {
        console.log(message);
    }

    function handleAllowance(message) {
        console.log(message);
        niblings.map((nibling) => (nibling.money += 100));
        console.log(niblings);
    }

    let cookies = ["🍪", "🍪", "🍪", "🍪", "🍪"];

    function handleEatCookie() {
        if (cookies.length === 0) {
            console.log("No more cookies left...");
        } else {
            cookies.pop();
            cookies = cookies;
            console.log(`Have a cookie my child 🍪.`);
        }
    }
</script>

<h2>{name}</h2>

<p>Cookie jar: {cookies}</p>

{#each niblings as nibling (nibling.id)}
    <Nibling
        {nibling}
        onShowLove={handleShowLove}
        piblingName={name}
        onGiveAllowance={handleAllowance}
        onEatCookie={handleEatCookie}
    />
{/each}


<!-- {#each niblings as nibling, index }
    <h1>{index}</h1>
    <Nibling nibling={nibling}/>
{/each} -->

<!-- 
    Task: 
    A nibling should be allowed to ask a pibling for allowance 
    A nibling should have a certain amount of money
    When they ask for allowance all niblings should get 100 of whatever currency
-->
