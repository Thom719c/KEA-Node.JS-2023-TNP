import {MongoClient} from "mongodb";

const URL = "mongodb://127.0.0.1:27017";

const client = new MongoClient(URL);

const db = client.db("candy");

/* const shops = db.collection("shops");
console.log(shops) */


export default {
    shops: db.collection("shops"),
    gummyBears: db.collection("gummyBears"),
    candy: db.collection("candies_types"),
    // shops: db.collection("candy")
};