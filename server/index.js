const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;

const users = []; 

app.use(cors());
app.get("/", (req, res) => {
    res.send("IT'S WORKING");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New connection:", socket.id);
    
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        console.log("Users:", users);
        
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
    });

    socket.on('message', (data) => {
        console.log("Received message:", data);
        io.emit('sendMessage', { user: users[data.id], message: data.message, id: data.id });
    });

    socket.on('disconnects', () => {
        console.log(`User disconnected: ${users[socket.id]}`);
        socket.broadcast.emit('leaveUser', { user: "Admin", message: `${users[socket.id]} has left` });
        delete users[socket.id];
        console.log("Users:", users);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
