const { tanks } = require("./tanks.json")

function getTank() {
    return tanks;
}

function addTank(tank) {
    tanks.push(tank);
    return tanks;
}

// console.log(module)
module.exports = {
    getTank,
    addTank
};