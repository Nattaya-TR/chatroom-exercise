const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const PORT ='9004';

let onlineUsers = 0;

server.listen(PORT, () => {
    console.log("server running on " + PORT);
});

io.on('connection', (socket) => {
    let addedUser = false;
    console.log('someone connected');

    //Client emits 'create username", this listens and executes
    socket.on('addNewUser', (username) => {
        if (addedUser) return;

        //store the username in the socket session for this client
        socket.username = username
        onlineUsers++;
        addedUser = true;
        console.log(onlineUsers + ' connected');

        //send back to the client
        socket.broadcast.emit('logIn', (username));
        io.emit('onlineList', {
            username : username,
            users : onlineUsers
        });
    });

    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", {
            username : socket.username,
            message  : message
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
            onlineUsers--;
        }
        username = socket.username
        //broadcast that the user has leave the chatroom
        socket.broadcast.emit('logOut', (username));
        console.log(' someone disconnected')

        io.emit('offlineList', {
            username : username,
            users : onlineUsers
        });
    });
});


