const url = "https://worldtimeapi.org/api/timezone/";
let clockInterval;

async function initializeTimes() {
    const timesData = await operationData("/api/times/", "", "", "GET")
    const timeZoneDiv = document.getElementById("timeZone");
    const timeZoneSelect = document.createElement("Select");
    timeZoneSelect.setAttribute("id", "timeZoneSelect")

    /* Prepending an option for not preselect anything */
    const chooseEmpty = document.createElement("option");
    chooseEmpty.innerText = "Choose..."
    timeZoneSelect.prepend(chooseEmpty);

    timesData.data.forEach(option => {
        const timeZoneOptions = document.createElement("option");
        timeZoneOptions.innerText = option.name;
        timeZoneOptions.value = option.timeZone;

        timeZoneSelect.appendChild(timeZoneOptions);
        timeZoneDiv.appendChild(timeZoneSelect);
    });

    timeZoneSelect.addEventListener("change", () => {
        if (timeZoneSelect.value !== 'Choose...') {
            clearInterval(clockInterval);
            fetchWorldTimeAPI(url, timeZoneSelect.value);
        }
    });
}
initializeTimes();

const fetchWorldTimeAPI = async (url, timezone) => {
    const timesData = await operationData(url, timezone, "", "GET");

    const date = document.getElementById("date");
    date.innerText = timesData.datetime.split("T")[0];

    const clock = document.getElementById("clock");
    clock.innerText = timesData.datetime.split("T")[1].slice(0, 8);

    const utc = document.getElementById("utc");
    utc.innerText = timesData.utc_offset;

    // Adjust the offset and update the clock every second
    const adjustedOffset = parseInt(timesData.utc_offset) - 1;
    clockInterval = setInterval(() => updateClock(clock, adjustedOffset), 1000);
}

function updateClock(clock, utcOffset) {
    const currentTime = new Date();
    currentTime.setHours((currentTime.getHours() + utcOffset));
    clock.textContent = currentTime.toLocaleTimeString();
}