const express = require("express");
const app = express();

// app.use("/public", express.static('./public/'));
app.use(express.static("public"));

// const tanksUtil = require("./util/tanks.js"); // if .js i doesnt look in node_modules
// console.log(tanksUtil.getTank())
const { getTank, addTank } = require("./util/tanks.js");
// console.log(getTank())


let visitorCount = 0;

// Pages

// send HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/frontpage.html");
});

app.get("/tanks", (req, res) => {
    res.sendFile(__dirname + "/public/tanks/tanks.html");
});

app.get("/visitors", (req, res) => {
    res.sendFile(__dirname + "/public/visitors/visitors.html");
});


// API

app.get("/api/tanks", (req, res) => {
    res.send({ data: getTank() });
});

app.get("/api/visitors", (req, res) => {
    res.send({ data: visitorCount });
});

app.put("/api/visitors", (req, res) => {
    res.send({ data: ++visitorCount });
});


// Serve a page called museum gaurds
app.get("/museumGuards", (req, res) => {
    res.sendFile(__dirname + "/public/museumGuards/museumGuards.html");
})


const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});