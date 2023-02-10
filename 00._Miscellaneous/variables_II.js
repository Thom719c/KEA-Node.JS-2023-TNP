"use strict"


// const public = true // doesn't work if "use strict" is used
// totalGlobalVariable = "Never ever do this";
// var globalVariable = "Never ever do this";

/* {
    var someValue = true;
    {
        var someValue = false;
    }
    console.log(someValue); // will log false
} */

/* {
    let someValue = true;
    {
        let someValue = false;
    }
    console.log(someValue); // will log true
} */

/* // will return 6, 6 times
for (var i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
} */

/* // will return 0, 1, 2, 3, 4, 5
for (let i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
} */

