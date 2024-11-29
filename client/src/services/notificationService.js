import axiosInstance from "./axiosInstance";

class NotificationService {
  constructor() {
    this.socket = null;
    this.onNotificationReceived = null;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.reconnectDelay = 1000;
    this.reconnecting = false;
  }

  connect(userId) {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (!userId) {
      console.error("userId is not provided.");
      return;
    }

    if (this.socket) {
      try {
        this.socket.close();
      } catch (e) {
        console.warn("Error closing existing socket:", e);
      }
      this.socket = null;
    }

    try {
      this.socket = new WebSocket(`ws://localhost:3000/?user-id=${userId}`);

      this.socket.onopen = () => {
        this.retryCount = 0;
        this.reconnecting = false;
      };

      this.socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          if (this.onNotificationReceived) {
            this.onNotificationReceived(notification);
          }
        } catch (error) {
          console.error("Error parsing notification data:", error);
        }
      };

      this.socket.onclose = (event) => {
        if (event.code !== 1000 && !this.reconnecting) {
          this.retryReconnect(userId);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        if (!this.reconnecting) {
          this.retryReconnect(userId);
        }
      };
    } catch (error) {
      console.error("WebSocket connection failed:", error);
      if (!this.reconnecting) {
        this.retryReconnect(userId);
      }
    }
  }

  retryReconnect(userId) {
    if (this.reconnecting || this.retryCount >= this.maxRetries) {
      console.error(
        this.retryCount >= this.maxRetries
          ? "Max reconnection attempts reached. Connection failed."
          : "Already reconnecting."
      );
      return;
    }

    this.reconnecting = true;
    const delay = this.reconnectDelay * Math.pow(2, this.retryCount);
    this.reconnectTimeout = setTimeout(() => {
      this.retryCount++;
      this.reconnecting = false;
      this.connect(userId);
    }, delay);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  setNotificationCallback(callback) {
    this.onNotificationReceived = callback;
  }

  async fetchNotifications(userId) {
    try {
      const response = await axiosInstance.get(`/notifications/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async markAsRead(notificationIds) {
    try {
      const response = await axiosInstance.patch(
        "/notifications/mark-as-read",
        { notificationIds }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      throw error;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
