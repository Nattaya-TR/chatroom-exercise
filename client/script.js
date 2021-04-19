let socket = io.connect();
let target = document.getElementById('target');

let username = prompt("Create your username");
socket.emit('addNewUser', (username));

console.log(username);

document.getElementById('sendToAll').addEventListener('click', function () {
    let message = document.getElementById("message").value;
    socket.emit('sendToAll', (message));
})

document.getElementById('sendToMe').addEventListener('click', function () {
    let message = document.getElementById("message").value;
    socket.emit('sendToMe', (message));
})

socket.on('logIn', (username) => {
    target.innerHTML += '<br>' + username + "  has joined the chatroom ";
})

socket.on('displayMessage', ({username,message}) => {
    target.innerHTML += '<br>' + username + ' : ' + message;
});


