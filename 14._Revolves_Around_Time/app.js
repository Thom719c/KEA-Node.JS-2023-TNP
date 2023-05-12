const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());

/* DATA */
let endtime = new Date("2023-03-02T23:59:00");

const timeZoneIdentifier = [
    { name: "Copenhagen", timeZone: "Europe/Copenhagen" },
    { name: "London", timeZone: "Europe/London" },
    { name: "New York", timeZone: "America/New_York" },
    { name: "Los Angeles", timeZone: "America/Los_Angeles" },
    { name: "Dawson Creek", timeZone: "America/Dawson_Creek" }
]


/* PAGES */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/frontpage.html");
});

app.get("/times", (req, res) => {
    res.sendFile(__dirname + "/public/times/times.html");
});

app.get("/countdownTimes", (req, res) => {
    res.sendFile(__dirname + "/public/countdownTimes/countdownTimes.html");
});


/* API */

app.get("/api/times", (req, res) => {
    res.send({ data: timeZoneIdentifier });
});

app.get("/api/countdownTimes", (req, res) => {
    res.send({ data: endtime });
});

app.put("/api/countdownTimes", (req, res) => {
    endtime = req.body.endtime;
    res.send({ data: endtime });
});


/* PORT */
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});