<script>
    import { onMount } from "svelte";
    let iframe;

    onMount(() => {
        iframe.src = "src/public/unity_game/unityGame.html";
    });
</script>

<div class="unityGameWrapper">
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe
        src=""
        bind:this={iframe}
        class="unityGameContainer"
        scrolling="no"
    />
</div>

<style>
    .unityGameWrapper {
        padding-bottom: 53%;
        position: relative;
    }

    .unityGameContainer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 960px;
        max-height: 600px;
        width: 100%;
        height: 100%;
    }
</style>
