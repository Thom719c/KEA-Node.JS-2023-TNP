<script>
    import { colorsList } from "../../stores/globalStore";
</script>

{#each $colorsList as colorPick }
    <div style={`background-color: ${colorPick.color};`}>
        <h4>{colorPick.username}</h4>
    </div>
{/each}