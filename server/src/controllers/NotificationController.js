const { WebSocketServer } = require("ws");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const wsClients = new Map();

exports.initializeWebSocket = (wss) => {
  wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("user-id");

    if (!userId) {
      console.error("WebSocket connection without user-id");
      ws.close(1008, "Missing user-id");
      return;
    }

    ws.on("error", (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
      ws.close();
    });

    if (wsClients.has(userId)) {
      wsClients.get(userId).close();
    }

    wsClients.set(userId, ws);

    ws.on("close", () => {
      wsClients.delete(userId);
    });
  });
};

const sendNotification = (userId, notification) => {
  const ws = wsClients.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(notification));
  }
};

exports.createNotification = async (userId, message) => {
  try {
    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      throw new Error("Invalid userId provided. Must be an integer.");
    }

    const notification = await prisma.notification.create({
      data: {
        userId: userIdInt,
        message,
      },
    });

    sendNotification(userIdInt, notification);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification.");
  }
};

exports.getUserNotifications = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

exports.markNotificationsAsRead = async (req, res) => {
  const { notificationIds } = req.body;

  try {
    await prisma.notification.updateMany({
      where: { id: { in: notificationIds } },
      data: { isRead: true },
    });
    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Failed to mark notifications as read." });
  }
};
