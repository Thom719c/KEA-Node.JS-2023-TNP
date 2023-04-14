import dotenv from "dotenv/config";
// dotenv.config();

import express from "express";
const app = express();

import path from "path";
app.use(express.static(path.resolve("../06._Svelte_Family/dist")));

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import rateLimit from 'express-rate-limit'
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(apiLimiter);

app.use("/auth", rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));


import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import gothamRouter from "./routers/gothamRouter.js";
app.use(gothamRouter);

app.get("/piblings", (req, res) => {
    res.send({ data: ["John", "Mark"] });
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