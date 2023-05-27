const io = require("socket.io")(3001, {
  cors: { origins: "*" },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.emit("chat", message);
  });

  socket.on("offer", (payload) => {
    console.log("Offer received", payload);
    socket.emit("update", payload);
  });

  socket.emit("status", "Successfully connected to the socket");

  socket.on("disconnect", () => {
    console.log("Connection terminated");
  });
});
