const { response } = require("express");
const express = require("express");
const app = express();

// app.use("/public", express.static('./public/'));
app.use(express.static("public"));

// const tanksUtil = require("./util/tanks.js"); // if .js i doesnt look in node_modules
// console.log(tanksUtil.getTank())
const { getTank, addTank } = require("./util/tanks.js");
// console.log(getTank())


let visitorCount = 0;

/* Pages */

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

// Serve a page called museum gaurds
app.get("/museumGuards", (req, res) => {
    res.sendFile(__dirname + "/public/museumGuards/museumGuards.html");
});

app.get("/proxy", (req, res) => {
    // Task: make a request to https://www.google.com
    // serve the text data
    fetch("https://www.google.com")
        .then(response => response.text())
        .then(result => res.send(result));
});


/* 
    Task create three routers called tanksRouter.js, visitorsRouter.js, gaurdsRouter.js
    and move the routes below into those files.
*/
/* API */
import tanksRouter from "./routers/tanksRouter.js";
app.use(tanksRouter);

import visitorsRouter from "./routers/visitorsRouter.js";
app.use(visitorsRouter);

import guardsRouter from "./routers/guardsRouter.js";
app.use(guardsRouter);

/* PORT */
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});