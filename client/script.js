let socket = io.connect();
let target = document.getElementById('target');
let overview = document.getElementById('overview');
let list = document.getElementById("onlineUsers");


let username = prompt("Create your username");


//Prompt to get username
if (username !== null ) {
    socket.emit('addNewUser', (username));
} else {
    alert("Please type your username again!! ");
}

console.log(username);

//Show who has joined the chatroom
socket.on('logIn', (username) => {
    target.innerHTML += '<br>' + username + "  has joined the chatroom ";
})

//get message from user
document.getElementById('sendToAll').addEventListener('click', function () {
    let message = document.getElementById("message").value;
    socket.emit('sendToAll', (message));
})

document.getElementById('sendToMe').addEventListener('click', function () {
    let message = document.getElementById("message").value;
    socket.emit('sendToMe', (message));
})

//display in chat container
socket.on('logIn', (username) => {
    target.innerHTML += '<br>' + username + "  has joined the chatroom ";
})

socket.on('displayMessage', ({username,message}) => {
    target.innerHTML += '<br>' + username + ' : ' + message;
});

socket.on('logOut', (username) => {
    target.innerHTML += '<br>' + username + ' has lefted the chatroom';
})

//display the list in side bar
socket.on('onlineList', ({username , users}) => {
    overview.innerHTML += '<br>'+ username + ' is online now.' + '<br>' + 'total ' + users + ' users ';
});

socket.on('offlineList', ({username , users}) => {
    overview.innerHTML +=  '<br>'+ username + ' is offline.' + '<br>' + 'total ' + users + ' users ';
})

/*function outputUsers(users) {
    list.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        list.appendChild(li);
    });
}*/

//prompt the user before leave the chatroom
document.getElementById('leave').addEventListener('click', () => {
    const leaving = confirm("Are you sure?");
    if (leaving) {
        window.location = 'index.html';
    }
});

