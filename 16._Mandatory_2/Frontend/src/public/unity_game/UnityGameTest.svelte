<!-- 
    Trying to convert the unityGame.html to svelte component.
    but have some trouble on Quiting the game before navigate to another page
-->
<script>
    import { onMount, onDestroy } from "svelte";

    let unityInstance;

    let container;
    let canvas;
    let loadingBar;
    let progressBarFull;
    let fullscreenButton;
    let warningBanner = [];

    function unityShowBanner(msg, type) {
        warningBanner = [
            ...warningBanner,
            {
                msg,
                type,
            },
        ];

        // Show banner if there is at least one warning or error
        const hasWarningOrError = warningBanner.some(
            (banner) => banner.type !== "info"
        );
        warningBanner = hasWarningOrError ? warningBanner : [];

        // Remove banner after 5 seconds if it is a warning
        if (type !== "error") {
            setTimeout(() => {
                warningBanner = warningBanner.filter(
                    (banner) => banner.msg !== msg
                );
            }, 5000);
        }
    }

    onMount(() => {
        if (!canvas) {
            return;
        }
        const buildUrl = "src/public/unity_game/Build";
        const loaderUrl = buildUrl + "/unityGame.loader.js";
        const config = {
            dataUrl: buildUrl + "/unityGame.data.unityweb",
            frameworkUrl: buildUrl + "/unityGame.framework.js.unityweb",
            codeUrl: buildUrl + "/unityGame.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "UnityFirstProject",
            productVersion: "0.1",
            showBanner: unityShowBanner,
        };

        loadingBar.style.display = "block";

        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = async () => {
            try {
                unityInstance = await createUnityInstance(
                    canvas,
                    config,
                    (progress) => {
                        progressBarFull.style.width = 100 * progress + "%";
                    }
                );
                loadingBar.style.display = "none";
                fullscreenButton.onclick = () => {
                    unityInstance.SetFullscreen(1);
                };
            } catch (message) {
                console.log("message", message);
            }
            // console.dir(unityInstance);

            /* if (!isOnPage) {
                unityInstance.Quit();
            } */
        };
        document.body.appendChild(script);
    });

    /* onDestroy(() => {
        // unityInstance.Quit();
        if (unityInstance.Module.SystemInfo.platform === "WebGLPlayer") {
            unityInstance.Quit();
        }
    }); */
</script>

<div id="unity-container" class="unity-desktop" bind:this={container}>
    <canvas id="unity-canvas" width="960" height="600" bind:this={canvas} />
    <div id="unity-loading-bar" bind:this={loadingBar}>
        <div id="unity-logo" />
        <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full" bind:this={progressBarFull} />
        </div>
    </div>
    {#if warningBanner.length}
        <div id="warning-banner">
            {#each warningBanner as banner}
                <div class="banner {banner.type}">
                    {banner.msg}
                </div>
            {/each}
        </div>
    {/if}
    <button id="fullscreen-button" bind:this={fullscreenButton}>
        Fullscreen
    </button>
</div>