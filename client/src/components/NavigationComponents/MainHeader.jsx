import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Notifications, ExitToApp, Lock, Person } from "@mui/icons-material";
import { getUserProfile, getFullName } from "../../services/userService";
import axiosInstance from "../../services/axiosInstance";
import notificationService from "../../services/notificationService";
import NotificationModal from "../modals/NotificationModals/NotificationModal";

const MainHeader = ({ setActiveComponent, activeComponent }) => {
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        const name = getFullName(userData);
        setFullName(name);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchInitialNotifications = async () => {
        try {
          const notifications = await notificationService.fetchNotifications(
            user.id
          );
          const initialUnreadCount = notifications.filter(
            (notif) => !notif.isRead
          ).length;
          setUnreadCount(initialUnreadCount);
        } catch (error) {
          console.error("Failed to fetch initial notifications:", error);
        }
      };
      fetchInitialNotifications();

      notificationService.connect(user.id);
      notificationService.setNotificationCallback((newNotification) => {
        if (!newNotification.isRead) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      });

      return () => {
        notificationService.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserSectionClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setActiveComponent("Profile");
  };

  const handleChangePasswordClick = () => {
    setActiveComponent("ChangePassword");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {});
      navigate("/");
    } catch (err) {
      console.error(
        "Logout error: ",
        err.response ? err.response.data.message : "Error logging out"
      );
    }
  };

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNotificationRead = (newUnreadCount) => {
    setUnreadCount(newUnreadCount);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex-grow text-2xl font-semibold text-[#1666F7] ml-4">
        {activeComponent}
      </div>
      <div className="flex items-center space-x-8">
        <Tooltip title="Notifications" placement="bottom">
          <div className="relative">
            <Notifications
              ref={notificationButtonRef}
              className="text-black cursor-pointer"
              onClick={handleNotificationClick}
            />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
        </Tooltip>
        <div
          className="flex items-center space-x-2 cursor-pointer relative"
          onClick={handleUserSectionClick}
        >
          <div className="flex items-center border-2 bg-white shadow-inner border-blue-600 rounded-lg px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user
                  ? (
                      user.firstName.charAt(0) + user.lastName.charAt(0)
                    ).toUpperCase()
                  : "U"}
              </span>
            </div>
            {fullName && <span className="ml-2 text-sm">{fullName}</span>}
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 bg-white p-2 mt-3 border border-[#ccc] rounded-md shadow-lg z-50"
              style={{ width: "200px" }}
            >
              <button
                onClick={handleProfileClick}
                className="w-full text-gray-700 flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Person />
                <span>View Profile</span>
              </button>
              <button
                onClick={handleChangePasswordClick}
                className="w-full text-gray-700 flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Lock />
                <span>Change Password</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-red-500 flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <ExitToApp />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <NotificationModal
          userId={user?.id}
          visible={isModalOpen}
          onClose={handleModalClose}
          onNotificationsRead={handleNotificationRead}
        />
      )}
    </div>
  );
};

export default MainHeader;
