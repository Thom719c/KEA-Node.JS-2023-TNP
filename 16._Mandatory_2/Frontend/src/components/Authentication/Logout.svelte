<script>
    import {
        session,
        serverURL,
        serverEndpoints,
    } from "../../stores/stores.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { link } from "svelte-navigator";
    import Cookies from 'js-cookie'

    export let isLink = false;
    // export let buttonText = "";

    const navigate = useNavigate();
    const location = useLocation();

    let email;
    let fullname;

    async function handleLogout() {
        const url = $serverURL + $serverEndpoints.authentication.logout;

        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                $session = data.user;
                Cookies.remove('userSession')
            });

        navigate("/profile", { replace: true });
    }
</script>

<!-- <button on:click={handleLogout}>
    {#if buttonText === ""}
        <i class="bi bi-box-arrow-right" />
    {:else}
        {buttonText}
    {/if}
</button> -->

{#if !isLink}
    <button on:click={handleLogout}>
        Logout
    </button>
{:else}
    <!-- <Link to="logout" on:click={handleLogout}>
        <i class="bi bi-box-arrow-right" />
    </Link> -->
    <a class="nav-link" href="logout" use:link on:click={handleLogout}>
        <i class="bi bi-box-arrow-right" />
    </a>
{/if}
