/* 
    import jokes from "./jokes.json" assert { type: "json" };
    export default jokes; 
*/

/* 
    Task fetch a joke from 
    https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit
*/

/* fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit")
    .then(response => response.json())
    .then(res => {
        console.log(res);
    }); 
*/

import Sentiment from "sentiment";
const sentiment = new Sentiment();

async function getJoke() {
    const URL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    const response = await fetch(URL);
    const result = await response.json();

    const jokeToAnalyze = result.joke || `${result.setop} ${result.delivery}`
    const { score } = sentiment.analyze(jokeToAnalyze);
    if (score < 0) {
        return await getJoke();
    } else {
        return result;
    }
}   

// getJoke();
// console.log(await getJoke());

export default getJoke;

