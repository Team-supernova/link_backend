import ChatController from "../controllers/ChatController";
import { io } from "../index";



io.on("connection", socket => {
    console.log("Client connected with id: " + socket.id);
    socket.on("join_room", data => {
      const { room } = data;
      socket.join(room);
      const messages = ChatController.getChats(room);
      const sortedMessages = sortMessagesByDate(messages);
      socket.to(room).emit("history", sortedMessages);
    });

    socket.on("send_message", data => {
      const { id, sender, receiver, message, imageURI, room } = data;
      const result = ChatController.createChat(id, sender, receiver, message, imageURI, room);
      io.in(room).emit("message", result);
    });

    socket.on("typing", data => {
        // truncate the data.sender in the middle after 5 characters and add ... then the last 3 chars
        const message = `${data.sender.substring(0, 5)}...${data.sender.substring(data.sender.length - 3)}`;
        socket.broadcast.to(data.room).emit('typing', `${message} is typing...`);
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });