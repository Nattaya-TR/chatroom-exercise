const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

//let counter = 0;

server.listen(9004, () => {
    console.log("server running on " +9004);
});

io.on('connection', (socket) => {
    console.log(' someone connected');
    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", (message));
    });

    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", (message));
    });
});


