<script>
    import { colorsList, myUsername } from "../../stores/globalStore";
    import io from "socket.io-client";
    const socket = io("localhost:8080");

    let choosenColor = "#000000";

    function handleColorChoosen() {
        console.log(choosenColor);
        socket.emit("a client choose a color", {
            data: choosenColor,
            username: $myUsername,
        });
    }

    socket.on("a new color just dropped", (data) => {
        // don't do this... do it the Svelte way
        // by adding it to a store and let App.svelte subscribe to it
        document.body.style.backgroundColor = data.data;
        console.log(data)

        colorsList.update((list) => {
            list.push({
                color: data.data,
                username: data.username,
            });
            return list;
        });
    });
</script>

<input type="color" bind:value={choosenColor} />
<button on:click={handleColorChoosen}>Send Color</button>
