import db from "./connections.js";

db.shops.deleteOne({ city: "Roskilde" });