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
const wss = new WebSocketServer({
  server,
  path: "/",
});
require("./src/controllers/NotificationController").initializeWebSocket(wss);

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

// Import FAQ routes
const faqRoutes = require("./src/routes/FaqRoutes");
app.use("/api/faqs", faqRoutes);

// WebSocket connection for real-time chatbot communication
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    const userInput = message.toString();
    const faq = await prisma.fAQ.findFirst({
      where: {
        question: {
          equals: userInput,
          mode: "insensitive",
        },
      },
    });

    const response = faq
      ? faq.answer
      : "I'm sorry, I don't have an answer for that.";
    ws.send(response);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

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
