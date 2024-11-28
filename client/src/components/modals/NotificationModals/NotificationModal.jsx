import React, { useEffect, useState } from "react";
import notificationService from "../../../services/notificationService";
import { Divider, Button } from "@mui/material";

const NotificationModal = ({ userId, visible, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.fetchNotifications(userId);
        setNotifications(data);
        setUnreadCount(data.filter((notif) => !notif.isRead).length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (visible) {
      fetchNotifications();
    }
  }, [visible, userId]);

  useEffect(() => {
    notificationService.connect(userId);
    notificationService.setNotificationCallback((newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      notificationService.disconnect();
    };
  }, [userId]);

  const markAsRead = async () => {
    const unreadNotificationIds = notifications
      .filter((notif) => !notif.isRead)
      .map((notif) => notif.id);

    if (unreadNotificationIds.length > 0) {
      try {
        await notificationService.markAsRead(unreadNotificationIds);
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, isRead: true }))
        );
        setUnreadCount(0);
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  return (
    <div
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 999,
        width: "300px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h3>Notifications</h3>
      <Button onClick={markAsRead} type="primary" block>
        Mark All as Read
      </Button>
      <p>{unreadCount} Unread Notifications</p>

      {notifications.length > 0 ? (
        <div>
          {notifications.map((notif) => (
            <div key={notif.id}>
              <div
                style={{
                  fontWeight: notif.isRead ? "normal" : "bold",
                  marginBottom: "10px",
                }}
              >
                {notif.message}
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications</p>
      )}
      <Button onClick={onClose} type="default" block>
        Close
      </Button>
    </div>
  );
};

export default NotificationModal;
