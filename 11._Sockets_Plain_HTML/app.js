import express from "express";
const app = express();
app.use(express.static("public"));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A client connected", socket.id);

    /* socket.on("ready event", (data) => {
        console.log("From the ready event:", data.data);
    }); */
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));



// http://localhost:8080/socket.io/socket.io.js


// on -> brain
// emit -> mouth talk/emitting