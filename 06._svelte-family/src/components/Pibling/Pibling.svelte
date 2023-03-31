<script>
    import Nibling from "../Nibling/Nibling.svelte";

    export let name;
    export let niblings = [];
</script>

<h2>{name}</h2>

{#each niblings as nibling (nibling.id) }
    <Nibling nibling={nibling}/>
{/each}


<!-- {#each niblings as nibling, index }
    <h1>{index}</h1>
    <Nibling nibling={nibling}/>
{/each} -->