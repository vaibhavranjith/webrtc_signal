import {Server} from 'socket.io';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import dotenv from 'dotenv';
import {TimeStamp} from './utils/TimeStamp.js'
dotenv.config();
var port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


io.on('connection',socket=>{
    socket.on('create or join', (room) => {
        const numClients = io.sockets.adapter.rooms.get(room) ? io.sockets.adapter.rooms.get(room).size:0;
        function log(room,logObj){
           io.to(room).emit('log',logObj) 
        }
        io.on(room,(obj)=>{
            console.log(obj);
        })
        if (numClients === 0) {
            console.log(`${socket.id} joined ${room}`)
            socket.join(room);
            socket.emit('created', room);
            log(room,`Joined ${room}`)
        } else if (numClients === 1) {
            console.log(`${socket.id} joined ${room}`)
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room);
            log(room, `Joined ${room}`)
        } else { // max two clients
            socket.emit('full', room);
            log(room, "A person tried to log into this room")
        }
    });
    socket.on('message', async (message) => {
        console.log(message);
        socket.to(message.roomId).emit("reply", message);
    });
    socket.on('unsubscribe',(roomId)=>{
        console.log(`${socket.id} left ${roomId}`);
        socket.leave(roomId);
    })
});

server.listen(port,()=>{
    console.log(TimeStamp(),`Signal on ${port}`);
})