const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

let users = 0;

server.listen(9004, () => {
    console.log("server running on " +9004);
});

io.on('connection', (socket) => {
    let addedUser = false;
    console.log('someone connected');
    console.log(users + ' connected');

    //Client emits 'create username", this listens and executes
    socket.on('addNewUser', (username) => {
        if (addedUser) return;

        //store the username in the socket session for this client
        socket.username = username;
        users++;
        addedUser = true;
        socket.broadcast.emit('logIn', (username));
        io.emit('onlineList', {
            username : socket.username,
            users : users
        });
    });

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

    socket.on('disconnect', () => {
        if (addedUser) {
            users--;
        }
        username = socket.username
        socket.broadcast.emit('logOut', (username));
        console.log(' someone disconnected')

        io.emit('offlineList', {
            username : socket.username,
            users : users
        });
    });
});


