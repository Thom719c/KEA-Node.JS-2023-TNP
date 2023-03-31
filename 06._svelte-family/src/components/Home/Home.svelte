<script>
    import { fridgeMessages } from "../../store/fridgeMessages.js";
    // console.log(refrigeratorMessages); // Output: {set: ƒ, update: ƒ, subscribe: ƒ}

    function eraseFridgeMessages() {
        fridgeMessages.set([]);
    }
</script>

<h5>{$fridgeMessages}</h5>
<button on:click={eraseFridgeMessages}>Erease Fridge Messages</button>

<slot />

<p>-------------------</p>
<p>|&nbsp;&nbsp;&nbsp;&nbsp; Welcome &nbsp;&nbsp;&nbsp;&nbsp;|</p>
<p>-------------------</p>

<div class="box">
    <p>Welcome</p>
</div>

<style>
    .box {
        border: 2px solid white;
    }
</style>
