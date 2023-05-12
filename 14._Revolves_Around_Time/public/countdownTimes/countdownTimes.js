
fetch("/api/countdownTimes/")
    .then(response => response.json())
    .then(result => {
        countdownClock(result.data);
        const endtimeInput = document.getElementById("endtime");
        endtimeInput.value = result.data.slice(0, 16);
        endtimeInput.min = new Date().toISOString().slice(0, 16);
    });

let timeInterval;

function countdownClock(endtime) {
    clearInterval(timeInterval);

    const daysP = document.getElementById("days");
    const hoursP = document.getElementById("hours");
    const minutesP = document.getElementById("minutes");
    const secondsP = document.getElementById("seconds");

    timeInterval = setInterval(() => {
        const timeRemaining = getTimeRemaining(endtime);

        daysP.innerText = `Days\n${timeRemaining.days}`;
        hoursP.innerText = `Hours\n${timeRemaining.hours}`;
        minutesP.innerText = `Minutes\n${timeRemaining.minutes}`;
        secondsP.innerText = `Seconds\n${timeRemaining.seconds}`;

        if (timeRemaining.totalDifference <= 0) {
            clearInterval(timeInterval);
        };
    }, 1000);
}

function getTimeRemaining(endtime) {
    const totalDifference = Date.parse(endtime) - Date.parse(new Date());   // Calculate the time difference in milliseconds.
    const seconds = Math.floor((totalDifference / 1000) % 60);              // Calculate the remaining seconds after removing all the full minutes.
    const minutes = Math.floor((totalDifference / 1000 / 60) % 60);         // Calculate the remaining minutes after removing all the full hours.
    const hours = Math.floor((totalDifference / (1000 * 60 * 60)) % 24);    // Calculate the remaining hours after removing all the full days.
    const days = Math.floor(totalDifference / (1000 * 60 * 60 * 24));       // Calculate the remaining days.

    return { totalDifference, days, hours, minutes, seconds };
}

function enterEndtime(endtime) {
    // const endtime = new Date(document.getElementById("endtime").value);

    fetch("/api/countdownTimes/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ endtime: endtime })
    })
        .then(response => response.json())
        .then(result => countdownClock(result.data));
}