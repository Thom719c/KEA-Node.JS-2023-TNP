import express from "express";
import templateEngine from "./util/templateEngine.js";
import session from "express-session";
import { v4 as uuidv4 } from 'uuid';
import users from "./util/users.js";
// import pages from "./util/pages/pages.js";
import { getPages, savePages } from "./util/pages/pages.js";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecret-mandatory',
    resave: false,
    saveUninitialized: true
}));

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

const login = templateEngine.readPage(`login/login.html`);
const loginPage = templateEngine.renderPage(login, {
    documentTitle: "Mandatory I | Login",
    activePage: "%%ACTIVEPAGELOGIN%%",
    cssLink: `<link rel="stylesheet" href="pages/login/login.css">`
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

// Route for the login page
app.get('/login', (req, res) => {
    res.send(loginPage.replace("%%ERRORMSG%%", ""));
});

app.get('/dashboard', (req, res) => {
    const userId = req.session.userId;

    // Check if user is logged in
    if (userId) {
        res.send(adminPage);
    } else {
        // User is not logged in, redirect to login page
        res.redirect('/login');
    }
});

app.get('/page/:pageId', (req, res) => {
    // Get the ID of the requested page
    const pageId = req.params.pageId;
    // Get the list of pages
    const pages = getPages();
    // Find the requested page by ID
    const page = pages.find(page => page.id === pageId);

    // If the page was not found, return a 404 error
    if (!page) {
        res.status(404).send('Page not found');
        return;
    }

    // Render the page with the template engine
    const renderedPage = templateEngine.renderPage(page.content, {
        documentTitle: `Mandatory I | ${page.title}`,
        activePage: `%%ACTIVEPAGECREATEDPAGE%%`
    });

    // Send the rendered page as the response
    res.send(renderedPage);
});


/* API */
app.get('/api/pages', (req, res) => {
    // Get the list of pages
    const pages = getPages();
    res.send(pages);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => email === user.email);

    // Validate user's credentials here
    if (user && user.password === password) {
        // Store the user ID in the session. Setups session to keep user logged in
        req.session.userId = user.id;

        // Redirect user to dashboard or profile page
        res.redirect('/dashboard');
    } else {
        res.send(loginPage.replace("%%ERRORMSG%%", "Invalid login credentials"));
        // res.status(401).send('Invalid login credentials');
    }
});

// Route for creating a new documentation page
app.post('/api/admin/create-documentation-page', (req, res) => {
    const { title, content } = req.body;

    // Convert textarea input into HTML
    const htmlContent = content
        .split('\r\n')
        .map(line => `<p>${line}</p>`)
        .join('')
        .replace('<p></p>', '<br>');

    // Get existing pages
    const pages = getPages();

    // Create a new documentation page object and add it to the pages array
    const newPage = { id: Date.now().toString(), title, content: `<h1>${title}</h1><hr>${htmlContent}` };
    pages.push(newPage);

    // Save updated pages to JSON file
    savePages(pages);

    res.redirect('/');
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