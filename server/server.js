const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");

require("dotenv").config();

const port = process.env.PORT || 5000;

// database configuration

const connectDB = require("./config/connectDB");
connectDB();

// general middlewares
app.use(express.json());
app.use(cors());

// login/register route
app.use("/api/v1/users", require("./routes/login_regRoute"));
app.use("/api/v1/admin", require("./routes/adminRoute"));
app.use("/api/v1/teacher", require("./routes/teacherRoute"));
app.use("/api/v1/student", require("./routes/studentRoute"));
app.use("/api/v1/messages", require("./routes/messageRoute"));
app.use("/api/v1/authmsg", require("./routes/messageAuth"));

app.use("/uploads", express.static("./uploads"));

const server = app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
