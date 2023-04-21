import express from "express";
const app = express();

app.use(express.json());

// use cors or make the dist and serve static

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import planetRouter from "./routers/planetsRouter.js";
app.use(planetRouter);

import peopleRouter from "./routers/peopleRouter.js";
app.use(peopleRouter);

/* PORT */
const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", server.address().port);
});