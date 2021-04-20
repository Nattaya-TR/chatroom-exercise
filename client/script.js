let socket = io.connect();
let target = document.getElementById('target');
let list = document.getElementById('onlineList');

let colors = ['#f7451d', '#dd8f08', '#fcf527', '#8afc27', '#03e294',
    '#0391c9', '#06067f', '#9c0be5', '#f849f0', '#e71313']

let username = prompt("Create your username");

function getUserColor (username) {
    // Compute hash code
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

if (username !== null ) {
    getUserColor(username);
    socket.emit('addNewUser', (username));
} else {
    alert("Please type your username again!! ");
}

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

socket.on('logOut', (username) => {
    target.innerHTML += '<br>' + username + ' has lefted the chatroom';
})

socket.on('onlineList', ({username, users}) => {
    list.innerHTML += '<br>'+ username + ' is online now.' + '<br>' + 'total ' + users + ' users ';
});

socket.on('offlineList', ({username , users}) => {
   list.innerHTML +=  '<br>'+ username + ' is offline.' + '<br>' + 'total ' + users + ' users ';
})


