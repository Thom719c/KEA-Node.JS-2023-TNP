import db from "./connections.js";

db.shops.updateOne({ city: "Roskilde" }, { $push: { shops: { name: "Candy Biksen" } } });