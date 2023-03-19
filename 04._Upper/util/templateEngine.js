import fs from "fs";
import getJoke from "./jokes.js";
import escape from "escape-html";

const components = "public/components/";
const pageRoot = "public/pages/";

// export default function renderPage(pagePath, config = {}) {
//     const myArray = [1, 2, 3]
//     /* Components */
//     const navbar = fs.readFileSync(`${components}navbar/navbar.html`).toString()
//         .replace("%%DOCUMENTTITLE%%", config.documentTitle || "Upper")
//         .replace("%%CSS_LINK%%", config.cssLink || "")
//         .replace("%%JOKES%%", config.jokes || "");
//     const footer = fs.readFileSync(`${components}footer/footer.html`).toString()
//         .replace("%%FOOTER_YEAR%%", `Copyright © ${new Date().getFullYear()}`)
//         .replace("$DATA", JSON.stringify(myArray));

//     const page = fs.readFileSync(pageRoot + pagePath).toString();
//     return navbar + page + footer;
// }


console.log(escape("<script>sdfsdf</script>"));
console.log(escape("sdfsdfsdf"));


function renderPage(page, config = {}) {
    const navbar = fs.readFileSync(`${components}navbar/navbar.html`).toString()
        .replace("%%DOCUMENTTITLE%%", config.documentTitle || "Upper")
        .replace("%%CSS_LINK%%", config.cssLink || "")
    const footer = fs.readFileSync(`${components}footer/footer.html`).toString()
        .replace("%%FOOTER_YEAR%%", `Copyright © ${new Date().getFullYear()}`)

    return navbar + page + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pageRoot + pagePath).toString();
}

async function renderJokePage() {
    const path = `${pageRoot}jokes/jokes.html`;
    let jokePage = readPage(path);
    const joke = await getJoke();

    if (joke.joke) {
        jokePage = jokePage.replace("%%JOKE_HTML_CONTENT%%", `<h3>${escape(joke.joke)}</h3>`);
    } else if (joke.setup && joke.delivery) {
        const jokeHtmlContent = `
            <h3>${escape(joke.setup)}</h3>
            <h4>...</h4>
            <h3>${escape(joke.delivery)}</h3>
        `;
        jokePage = jokePage.replace("%%JOKE_HTML_CONTENT%%", jokeHtmlContent);
    } else {
        jokePage = jokePage.replace("%%JOKE_HTML_CONTENT%%", "<h3>No jokes for you.</h3>");
    }

    const contructedPage = renderPage(jokePage, {
        documentTitle: "Upper | Jokes",
        cssLink: `<link rel="stylesheet" href="/pages/jokes/jokes.css">`
    })
    
    return contructedPage;
}

export default {
    renderPage,
    readPage,
    renderJokePage
}