import db from "./connections.js";

// const foundShops = await db.shops.find({ city: "Hellerup" }).toArray();
const foundShops = await db.shops.find().toArray();
console.log(foundShops);


/* const foundCandy = await db.candy.find().toArray();
console.log(foundCandy); */