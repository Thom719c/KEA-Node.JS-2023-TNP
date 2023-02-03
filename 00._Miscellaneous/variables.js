// Const Rule 1: have to assign a value when declaring.
// const me;

const me = {
    /* 
    key: value 
    === key-value pairs
    */
   name: "Lars"
};

const hobbies = ["Football", "Swimming"];
hobbies.push("Cooking")

// Const Rule 2: cannot reassign to constant
// me = {};
me.name = "Peter"
me.hobbies = hobbies;

console.log(me)


const hobbyOne = "Football skille level: '6'";
const hobbyTwo = 'Swimming skille level: "3"';
const hobbyThree = `Cooking skille level: "'${2 + 2}'"`;

const allHobbies = `1: ${hobbyOne} \n2: ${hobbyTwo} \n3: ${hobbyThree}`
console.log(allHobbies)

// TODO single quotes and double quotes