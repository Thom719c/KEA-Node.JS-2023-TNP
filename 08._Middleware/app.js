import express from "express";
const app = express();


function houseButler(req, res, next) {
    console.log("This way...");
    next();
}
app.use("/room", houseButler);
import roomRouter from "./routers/roomRouter.js";
app.use(roomRouter);



function guard(req, res, next) {
    if (req.query.name === "Thom") {
        req.myName = "Thom";
        next();
    } else {
        res.send({ message: "You are not allowed to enter" })
    }
}

app.get("/frontdoor", guard, (req, res, next) => {
    res.send({ message: `Please enter ${req.myName}` });
});


/* app.get("/room", (req, res, next) => {
    next();
    // res.send({ message: "I am in room 1" });
});

app.get("/room", (req, res, next) => {
    res.send({ message: "I am in room 2" });
}); */

/* Fall back */
app.get("*", (req, res) => {
    res.send("<h1>404 - Not Found</h>");
});


/* PORT */
const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});