const express = require('express');
const { createServer } = require('http');
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req,res) => {
  res.json("Hello to dev channel");
});

io.on("connection", (socket) => {
   console.log("Backend Connected");
   socket.on("sendMsg",(message) => {
      socket.join("ag");
      console.log(message);
      //socket.emit("sendMsgServer",{...message, type:"otherMag"});
      io.to("ag").emit("sendMsgServer",{...message, type:"otherMag"});
   });
});


httpServer.listen(3000);

// var http = require('http');

// var app = express();
// var server = http.createServer(app);

// var io = require('socket.io')(server);
// var path = require('path');


// app.use(express.static(path.join(__dirname,'./public')));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });


// var name;

// io.on('connection', (socket) => {
//   console.log('new user connected');
  
//   socket.on('joining msg', (username) => {
//   	name = username;
//   	io.emit('chat message', `---${name} joined the chat---`);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     io.emit('chat message', `---${name} left the chat---`);
    
//   });
//   socket.on('chat message', (msg) => {
//     socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
//   });
// });

// server.listen(3000, () => {
//   console.log('Server listening on :3000');
// });
