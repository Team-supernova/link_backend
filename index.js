import express from 'express';
import { config } from "dotenv"
import bodyParser from 'body-parser';
import cors from'cors';
import { Server } from 'socket.io';
import router from './views/index.js';
import http from "http";
import ChatController from './controllers/ChatController.js';
import { sortMessagesByDate } from './utils/index.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: process.env.CLIENTURI
})); // as middleware
app.use(bodyParser.json());

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(router);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENTURI,
    methods: ["GET", "POST"],
  },
});

// Listen for when the client connects via socket.io-client
io.on("connection", socket => {
  console.log("Client connected with id: " + socket.id);
  socket.on("join_room", async (data) => {
    const { room } = data;
    socket.join(room);
    const messages = await ChatController.getChats(room);
    const sortedMessages = sortMessagesByDate(messages);
    io.in(room).emit("history", sortedMessages);
  });

  socket.on("send_message", async (data) => {
    const { id, sender, receiver, message, imageURI, room } = data;
    const result = await ChatController.createChat(id, sender, receiver, message, imageURI, room);
    io.in(room).emit("message", result);
  });

  socket.on("typing", data => {
      // truncate the data.sender in the middle after 5 characters and add ... then the last 3 chars
      if (data && data.sender) {
        const message = `${data.sender.substring(0, 5)}...${data.sender.substring(data.sender.length - 3)}`;
      socket.broadcast.to(data.room).emit('typing', `${message} is typing...`);
      }
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(PORT, () => `Server is is running on PORT ${PORT}`);
