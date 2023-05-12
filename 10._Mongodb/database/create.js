import db from "./connections.js";
// Task: create a new item in the database

db.shops.insertOne({ city: "Roskilde", shops: [] });