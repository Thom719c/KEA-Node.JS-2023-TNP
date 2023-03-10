// const express = require("express");
import express from "express";
const app = express();

import path from "path";
// const jokes = require("./util/jokes.js");
import jokes from "./util/jokes.js";
// console.log(await jokes.getJoke());

app.use(express.static("public"));

const pages = "public/pages/";

/* PAGES */
app.get("/", (req, res) => {
    res.sendFile(path.resolve(pages, "frontpage/frontpage.html"));
});

app.get("/IRLQuests", (req, res) => {
    res.sendFile(path.resolve("public/pages/IRLQuests/IRLQuests.html"));
});

app.get("/jokes", (req, res) => {
    res.sendFile(path.resolve(pages, "jokes/jokes.html"))
})

/* API */


/* PORT */
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});

/* function listen(port, callback) {
    try {
        // starting up the server.. on port
        if (callback) {
            callback();
        }
    } catch (error) {
        if (callback) {
            callback(error);
        }
        
    }
} */