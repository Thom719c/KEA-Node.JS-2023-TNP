import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
app.use(session({
    secret: 'keyboard cat', // make this in env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"],
    }
});

io.on("connection", (socket) => {
    console.log("A client connected", socket.id);

    socket.on("a client choose a color", (data) => {
        io.emit("a new color just dropped", data);
    });
});

/* app.get("/something", (req, res) => {
    res.send({ message: "something" });
}); */

app.get("/users/me", (req, res) => {
    res.send({ data: req.session.username });
});

app.post("/register", (req, res) => {
    req.session.username = req.body.username;
    res.send({ data: req.body.username });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));