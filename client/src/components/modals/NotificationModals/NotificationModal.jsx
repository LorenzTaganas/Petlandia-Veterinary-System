import React, { useEffect, useState, useRef } from "react";
import notificationService from "../../../services/notificationService";

const NotificationModal = ({
  userId,
  visible,
  onClose,
  onNotificationRead,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.fetchNotifications(userId);
        setNotifications(data || []);
        setUnreadCount(data ? data.filter((notif) => !notif.isRead).length : 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    if (visible && userId) {
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
        const updatedNotifications = notifications.map((notif) => ({
          ...notif,
          isRead: true,
        }));
        setNotifications(updatedNotifications);
        const newUnreadCount = 0;
        setUnreadCount(newUnreadCount);
        onNotificationsRead(newUnreadCount);
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-500 bg-opacity-50 ${
        visible ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="absolute right-32 top-16 bg-white p-4 rounded-lg shadow-lg max-w-sm w-full max-h-[400px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold">Notifications</h3>
        <p className="text-sm text-gray-600">
          {unreadCount} Unread Notifications
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
          onClick={markAsRead}
        >
          Mark All as Read
        </button>
        {notifications.length > 0 ? (
          <div className="mt-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="mb-4">
                <div
                  className={`${
                    notif.isRead ? "font-normal" : "font-bold"
                  } text-sm mb-2`}
                >
                  {notif.message}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
