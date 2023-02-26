const url = 'http://worldtimeapi.org/api/timezone/';

fetch("/api/times/")
    .then(response => response.json())
    .then(result => {
        const timeZoneDiv = document.getElementById("timeZone");
        const timeZoneSelect = document.createElement("Select");
        timeZoneSelect.setAttribute("id", "timeZoneSelect")

        /* Prepending an option for not preselect anything */
        const chooseEmpty = document.createElement("option");
        chooseEmpty.innerText = "Choose..."
        timeZoneSelect.prepend(chooseEmpty);

        result.data.forEach(option => {
            const timeZoneOptions = document.createElement("option");
            timeZoneOptions.innerText = option.name;
            timeZoneOptions.value = option.timeZone;

            timeZoneSelect.appendChild(timeZoneOptions);
            timeZoneDiv.appendChild(timeZoneSelect);
        });

        timeZoneSelect.addEventListener("change", () => {
            if (timeZoneSelect.value !== 'Choose...') {
                fetchWorldTimeAPI(url + timeZoneSelect.value);
            }
        });
    });


const fetchWorldTimeAPI = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const date = document.getElementById("date");
            date.innerText = result.datetime.split("T")[0];

            const time = document.getElementById("time");
            time.innerText = result.datetime.split("T")[1].slice(0, 8);

            const utc = document.getElementById("utc");
            utc.innerText = result.datetime.slice(-6);
        });
}