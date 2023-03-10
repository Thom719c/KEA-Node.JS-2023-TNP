// url = https://www.boredapi.com/api/activity/

/* Task fetch from boredapi and console log it */
fetch("https://www.boredapi.com/api/activity/")
    .then(response => response.json())
    .then(res => {
        console.log(res);
        /* Task make the activity visible in the quest header tag */
        document.getElementById("quest").innerText = res.activity + ".";
    });