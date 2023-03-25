import fs from "fs";

const components = "public/components/";
const pageRoot = "public/pages/";

function renderPage(page, config = {}) {
    const navbar = fs.readFileSync(`${components}navbar/navbar.html`).toString()
        .replace("%%DOCUMENTTITLE%%", config.documentTitle || "Upper")
        .replace(config.activePage, "active" || "")
        .replace("%%CSS_LINK%%", config.cssLink || "");

    const footer = fs.readFileSync(`${components}footer/footer.html`).toString()
        .replace("%%FOOTER_YEAR%%", `Copyright © ${new Date().getFullYear()}`);

    const newDocumentationsPagesJS = fs.readFileSync(`${components}createdDocumentationsPages/createdDocumentationsPages.html`)

    return navbar + page + newDocumentationsPagesJS + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pageRoot + pagePath).toString();
}

export default {
    renderPage,
    readPage
}