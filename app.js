const express = require("express");
const http = require("http");
const Server = require("socket.io").Server;
const Chat = require("./chatModel");
const connectDB = require("./db");
const { timeStamp } = require("console");
const { channel } = require("diagnostics_channel");

const app=express();
app.use(express.json())
connectDB();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>
{
    console.log("Connected");

    // socket.on("chat",chat=>{
    //     io.emit("chat",chat)
    // })

    const loadMessage = async() =>
        {
            try{
                const mesages = await Chat.find().sort({timeStamp:1}).exec();
                socket.emit('chat',mesages)
            }
            catch(err)
            {
                console.log(err);
            }
        }

        loadMessage();

        socket.on('newMessage',async(msg)=>
        {
            try{
                const mesages = new Chat(msg)
                await mesages.save();
                io.emit('message',msg);
            }
            catch(err)
            {
                console.log(err)
            }
        })

    socket.on("Disconnect",()=>{
        console.log("Disconnect");
    })
})

server.listen("3001",()=>
{
    console.log("Port is Running");
 })