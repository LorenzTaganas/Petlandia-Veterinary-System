const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// const db = require("./src/database/db");

const http = require("http");
const { WebSocketServer } = require("ws");
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

require("dotenv").config();
const port = process.env.PORT || 3000;

const routes = require("./src/routes/index");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(routes);

const {
  initializeWebSocket,
} = require("./src/controllers/NotificationController");
initializeWebSocket(wss);

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log(`Received: ${message}`);
//     ws.send(`Sent: ${message}`);
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

app.get("/", (req, res) => {
  res.send("Test");
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
