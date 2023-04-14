import { Router } from "express";
const router = Router();

// Server sitet redirect
router.get("/api/guards", (req, res) => {
    // http://localhost:8080/api/guards?passport=theskyisblue
    if (req.query.passport === "theskyisblue") {
        return res.redirect("/api/tanks");
    }
    res.send({ message: "You are not allowed to see the tanks. Give us the scret in the query wtring with the key being passport." });

});

export default router;