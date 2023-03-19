import express from "express";
import templateEngine from "./util/templateEngine.js";

const app = express();

app.use(express.static("public"));

const frontpage = templateEngine.readPage(`frontpage/frontpage.html`);
const frontpagePage = templateEngine.renderPage(frontpage, {
    documentTitle: "Mandatory I | Home",
    activePage: "%%ACTIVEPAGEHOME%%"
});

const javascript = templateEngine.readPage(`javascript/javascript.html`);
const javascriptPage = templateEngine.renderPage(javascript, {
    documentTitle: "Mandatory I | Javascript",
    activePage: "%%ACTIVEPAGEJS%%"
});

const node = templateEngine.readPage(`node/nodejs.html`);
const nodePage = templateEngine.renderPage(node, {
    documentTitle: "Mandatory I | Node",
    activePage: "%%ACTIVEPAGENODE%%"
});

const expressReadPage = templateEngine.readPage(`node/express.html`);
const expressPage = templateEngine.renderPage(expressReadPage, {
    documentTitle: "Mandatory I | Node - Express",
    activePage: "%%ACTIVEPAGENODE%%"
});

const restAPI = templateEngine.readPage(`node/restAPI.html`);
const restAPIPage = templateEngine.renderPage(restAPI, {
    documentTitle: "Mandatory I | Node - Rest API",
    activePage: "%%ACTIVEPAGENODE%%"
});

const terminalCommands = templateEngine.readPage(`terminalCommands/terminalCommands.html`);
const terminalCommandsPage = templateEngine.renderPage(terminalCommands, {
    documentTitle: "Mandatory I | Terminal Commands",
    activePage: "%%ACTIVEPAGECMD%%"
});

const deployment = templateEngine.readPage(`deployment/deployment.html`);
const deploymentPage = templateEngine.renderPage(deployment, {
    documentTitle: "Mandatory I | Deployment",
    activePage: "%%ACTIVEPAGEDEPLOYMENT%%"
});

const admin = templateEngine.readPage(`admin/admin.html`);
const adminPage = templateEngine.renderPage(admin, {
    documentTitle: "Mandatory I | Admin",
    activePage: "%%ACTIVEPAGEADMIN%%"
});

/* PAGES */
app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/javascript", (req, res) => {
    res.send(javascriptPage);
});

app.get("/nodejs", (req, res) => {
    res.send(nodePage);
});

app.get("/express", (req, res) => {
    res.send(expressPage);
});

app.get("/restAPI", (req, res) => {
    res.send(restAPIPage);
});

app.get("/terminalCommands", (req, res) => {
    res.send(terminalCommandsPage);
});

app.get("/deployment", (req, res) => {
    res.send(deploymentPage);
});

app.get("/admin", (req, res) => {
    //TODO login
    res.send(adminPage);
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