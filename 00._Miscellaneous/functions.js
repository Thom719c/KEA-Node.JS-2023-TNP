// possible because of hoisting
// console.log(random(0, 10));

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min);
}

const randomAnonumousFunction = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min);
};
// console.log(randomAnonumousFunction(0, 10));

const randomArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) - min);
};
// console.log(randomArrowFunction(0, 10));

// Lambda <-> arrow function
const randomArrowFunctionCompact = (min, max) => Math.floor(Math.random() * (max - min + 1) - min);
// console.log(randomArrowFunctionCompact(0, 10));


function genericActionPerformer(genericAction, genericName) {
    // do stuff...

    return genericAction(genericName);
}

const subtract = (name) => `${name} is subtracting.`;

// task without touching the two functions above but still using them below
// task make is console.log Tobias is subtracting.

const result = genericActionPerformer(subtract, "Tobias");
// console.log(result);

const walk = (name) => `${name} is walking.`;

// task: make it say Nicolas is walking
const walkResult = genericActionPerformer(walk, "Nicolas");
// console.log(walkResult);

// task: do it as oneline. it should console.log "Andrea is reading.""
// console.log(genericActionPerformer((name) => `${name} is reading.`, "Andrea"));

