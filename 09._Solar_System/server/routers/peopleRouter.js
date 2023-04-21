import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";


router.get("/people", async (req, res) => {
    const people = await db.all("SELECT * FROM people;");

    res.send({ data: people });
});

/* 
    Task
    1 And add a row in the people table that point to the id of the planets (FOREIGN KEY)
    2 Create a new router called people
    3 Create a router where you can add new people
*/
router.post("/people", async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Missing the key (name) in the body" });
    }

    const { lastID } = await db.run("INSERT INTO people (name, planet_id) VALUES (?, 3);", [req.body.name]);

    res.send({
        id: lastID,
        name: req.body.name
    });
});


export default router;