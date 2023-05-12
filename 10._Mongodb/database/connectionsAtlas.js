import dotenv from "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const URL = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@nodejskea.h2o97m4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(URL, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });

db.createCollection("shops");

const db = await client.db("candy");

const shops = await db.collection("shops");

await shops.insertOne({ city: "Roskilde", shops: [] });

const foundShops = db.shops.find().toArray();

console.log(foundShops);


/* import dotenv from "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const URL = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@nodejskea.h2o97m4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir); */