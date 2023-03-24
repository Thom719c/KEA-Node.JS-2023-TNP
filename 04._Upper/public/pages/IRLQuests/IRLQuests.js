// url = https://www.boredapi.com/api/activity/

/* Task fetch from boredapi and console log it */
function fetchQuest(activityQueryString = "") {
    fetch("https://www.boredapi.com/api/activity" + activityQueryString)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            /* Task make the activity visible in the quest header tag */
            document.getElementById("quest").innerText = res.activity + ".";
        });
}
fetchQuest();

// const getNewQuest = (type) => {
function getNewQuest() {
    const dropdown = document.getElementById("activity-dropdown");
    fetchQuest(`?type=${dropdown.value}`);
}

document.getElementById("fetch-new-quest-btn").addEventListener("click", getNewQuest);