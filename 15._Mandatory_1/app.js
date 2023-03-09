import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.static("public"));

const pages = "public/pages/";
const components = "./public/components/";

const navbar = fs.readFileSync(`${components}navbar/navbar.html`).toString();
const footer = fs.readFileSync(`${components}footer/footer.html`).toString();

const frontpage = fs.readFileSync(`${pages}frontpage/frontpage.html`).toString();
const nodePage = fs.readFileSync(`${pages}node/nodejs.html`).toString();
const expressPage = fs.readFileSync(`${pages}node/express.html`).toString();
const restAPIPage = fs.readFileSync(`${pages}node/restAPI.html`).toString();
const terminalCommandsPage = fs.readFileSync(`${pages}terminalCommands/terminalCommands.html`).toString();

/* PAGES */
app.get("/", (req, res) => {
    res.send(navbar
        .replace("%%ACTIVEPAGEHOME%%", "active")
        .replace("%%DOCUMENTTITLE%%", "Mandatory I | Node")
        + frontpage + footer);
});

app.get("/nodejs", (req, res) => {
    res.send(navbar
        .replace("%%ACTIVEPAGENODE%%", "active")
        .replace("%%DOCUMENTTITLE%%", "Mandatory I | Node")
        + nodePage + footer);
});

app.get("/express", (req, res) => {
    res.send(navbar
        .replace("%%ACTIVEPAGENODE%%", "active")
        .replace("%%DOCUMENTTITLE%%", "Mandatory I | Express")
        + expressPage + footer);
});

app.get("/restAPI", (req, res) => {
    res.send(navbar
        .replace("%%ACTIVEPAGENODE%%", "active")
        .replace("%%DOCUMENTTITLE%%", "Mandatory I | Rest API")
        + restAPIPage + footer);
});

app.get("/terminalCommands", (req, res) => {
    res.send(navbar
        .replace("%%ACTIVEPAGENODE%%", "active")
        .replace("%%DOCUMENTTITLE%%", "Mandatory I | Terminal Commands")
        + terminalCommandsPage + footer);
});


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