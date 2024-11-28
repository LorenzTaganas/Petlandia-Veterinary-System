class NotificationService {
  constructor() {
    this.socket = null;
    this.onNotificationReceived = null;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.reconnectDelay = 1000;
    this.reconnecting = false; // New flag to prevent overlapping reconnections
  }

  connect(userId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected.");
      return;
    }

    if (!userId) {
      console.error("userId is not provided.");
      return;
    }

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    try {
      this.socket = new WebSocket(`ws://localhost:3000/?user-id=${userId}`);

      this.socket.onopen = () => {
        console.log("WebSocket connection established.");
        this.retryCount = 0;
        this.reconnecting = false; // Reset reconnecting flag
      };

      this.socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          console.log("New notification received:", notification);
          if (this.onNotificationReceived) {
            this.onNotificationReceived(notification);
          }
        } catch (error) {
          console.error("Error parsing notification data:", error);
        }
      };

      this.socket.onclose = (event) => {
        console.log("WebSocket connection closed.", event.reason);
        if (event.code !== 1000) {
          this.retryReconnect(userId);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("WebSocket connection failed:", error);
    }
  }

  retryReconnect(userId) {
    if (this.reconnecting || this.retryCount >= this.maxRetries) {
      if (this.retryCount >= this.maxRetries) {
        console.error("Max reconnection attempts reached. Connection failed.");
      }
      return;
    }

    this.reconnecting = true;
    const delay = this.reconnectDelay * Math.pow(2, this.retryCount);
    console.log(
      `Reconnection attempt ${this.retryCount + 1} in ${delay / 1000}s...`
    );

    setTimeout(() => {
      this.retryCount++;
      this.reconnecting = false;
      this.connect(userId);
    }, delay);
  }

  setNotificationCallback(callback) {
    this.onNotificationReceived = callback;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log("WebSocket disconnected.");
    }
  }

  async fetchNotifications(userId) {
    try {
      const response = await fetch(`/notifications/user/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async markAsRead(notificationIds) {
    try {
      const response = await fetch("/notifications/mark-as-read", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      throw error;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
