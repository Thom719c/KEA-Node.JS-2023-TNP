import dataPages from "./pages.json" assert { type: "json" };
import fs from 'fs';

/* export const getPages = () => {
    try {
        const data = fs.readFileSync('./util/pages/pages.json');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}; */
export const getPages = () => {
    return dataPages;
}

export const savePages = (pages) => {
    fs.writeFileSync('./util/pages/pages.json', JSON.stringify(pages));
};

// export default dataPages;