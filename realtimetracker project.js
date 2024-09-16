const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
app.set("view engine ", " ejs");
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});
app.get("/", function (req, res) {
  res.render("index.ejs");
});
server.listen(300);
console.log("connected");
