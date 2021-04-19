const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

let users = 1;

server.listen(9004, () => {
    console.log("server running on " +9004);
});

io.on('connection', (socket) => {
    let addedUser = false;
    console.log(' someone connected');

    //Client emits 'create username", this listens and executes
    socket.on('addNewUser', (username) => {
        if (addedUser) return;

        //store the username in the socket session for this client
        socket.username = username;
        users++;
        addedUser = true;
        io.emit('logIn', (username));
    });
        /*echo (all client) that has connected
        socket.broadcast.emit('user joined',{
            username : socket.username,
            users : users
        });*/

    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", {
            username : socket.username,
            message : message
        });
    });

    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", {
            username : socket.username,
            message : message
        });
    });

});


