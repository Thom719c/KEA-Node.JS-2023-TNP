/* 
    Why: Because Javascript is single-threaded

    Example:
        Fetching over a network
        Many / Heavy calculations
        Cryptographic functions
        Reading / Writing to files
        Databases
*/

/* Solutions 1: Callbacks (cb)
    Con: Callback hell, Pyramid of doom
*/

/* Solutions 2: Promises
    Two states:
    - pending
    - fulfilled
        - rejected
        - resolved
*/

new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            // throw Error;
            // throw "Error message";
            resolve("Yaaaay");
        } catch (errorMessage) {
            // reject(errorMessage);
            reject("Naaaay");
        }
    }, 3000);
})
    .then(successMessage => console.log("Success message:", successMessage))
    .catch(errorMessage => console.log("Error message:", errorMessage));

/*  
    Task create a function called celebrate that returns a 
    promise that celebrates or not (up to you) 
*/
function celebrate(name) {
    return new Promise((resolve, reject) => {
        if (name) {
            resolve(`Congratulation ${name}`);
        } else {
            reject("No name specified. First argument should be name.");
        }
    });
}
/* 
    Task call celebrate and handle the resolve / reject
*/
// console.log(celebrate());
// celebrate().then(celebrateMessage => console.log("Celebrate message:", celebrateMessage));


/* 
    Task create a functions called "somethingGoodSomethingBad"
    it should return a new promise
    it should utilize both resolve and reject
    create a timeout to simulate asynchronous behavior
*/
function somethingGoodSomethingBad() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve("Something good!")
            } catch {
                reject("Something bad!")
            }
        }, 2000);
    });
}

somethingGoodSomethingBad()
    .then(successMessage => console.log(successMessage))
    .catch(errorMessage => console.log(errorMessage));

// IIEF
(async function getGoodOrBadMessage() {
    const somethingGoodSomethingBadMessage = await somethingGoodSomethingBad();
    console.log(somethingGoodSomethingBadMessage);
})();
// getGoodOrBadMessage();


(async function getGoodOrBadMessage() {
    try {
        const somethingGoodSomethingBadMessage = await somethingGoodSomethingBad();
        // const celebrationMessage = await celebrate("All of us");
        const celebrationMessage = await celebrate();
        console.log(somethingGoodSomethingBadMessage, celebrationMessage);
    } catch {
        
    }
})();

function parallel() {
    Promise.all([somethingGoodSomethingBad(), celebrate("All of us")]);
}