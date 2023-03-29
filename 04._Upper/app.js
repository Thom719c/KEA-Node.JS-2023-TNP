// const express = require("express");
import express from "express";
const app = express();

import path from "path";
// const jokes = require("./util/jokes.js");
// import getJoke from "./util/jokes.js";
// console.log(await jokes.getJoke());
import nodemailer from "./util/nodemailer.js";

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// import renderPage from "./util/templateEngine.js";
import templateEngine from "./util/templateEngine.js";

const frontpage = templateEngine.readPage(`frontpage/frontpage.html`);
const frontpagePage = templateEngine.renderPage(frontpage, {
    documentTitle: "Upper | Motivation"
});

/* const jokes = templateEngine.readPage(`jokes/jokes.html`);
const jokesPage = templateEngine.renderPage(jokes, {
    documentTitle: "Upper | Jokes",
    cssLink: `<link rel="stylesheet" href="/pages/jokes/jokes.css">`
}); */

const IRLQuests = templateEngine.readPage(`IRLQuests/IRLQuests.html`);
const IRLQuestsPage = templateEngine.renderPage(IRLQuests, {
    documentTitle: "Upper | IRLQuests"
});

const contact = templateEngine.readPage(`contact/contact.html`);
const contactPage = templateEngine.renderPage(contact, {
    documentTitle: "Upper | Contact"
});

/* PAGES */
app.get("/", (req, res) => {
    // res.sendFile(path.resolve(pages, "frontpage/frontpage.html"));
    res.send(frontpagePage);
});

app.get("/IRLQuests", (req, res) => {
    // res.sendFile(path.resolve("public/pages/IRLQuests/IRLQuests.html"));
    res.send(IRLQuestsPage);
});

app.get("/jokes", async (req, res) => {
    // res.sendFile(path.resolve(pages, "jokes/jokes.html"))
    /* const joke = await getJoke();
    const jokes = templateEngine.readPage(`jokes/jokes.html`)
    .replace("$JOKE", JSON.stringify(joke));
    const jokesPage = templateEngine.renderPage(jokes, {
        documentTitle: "Upper | Jokes",
        cssLink: `<link rel="stylesheet" href="/pages/jokes/jokes.css">`
    }); */
    const jokePage = await templateEngine.renderJokePage();
    res.send(jokePage);
});

app.get("/contact", (req, res) => {
    res.send(contactPage);
});


/* API */
app.post("/api/contact", async (req, res) => {
    console.log(req.body)
    nodemailer(req.body).catch(console.error);
    res.redirect("/");
});

/* PORT */
//const PORT = 8080;
const PORT = Number(process.env.PORT) || 8080;
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