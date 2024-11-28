import React, { useState, useEffect } from "react";
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

    if (user) {
      notificationService.connect(user.id);
      notificationService.setNotificationCallback((newNotification) => {
        setUnreadCount((prevCount) => prevCount + 1);
      });
    }

    return () => {
      if (user) {
        notificationService.disconnect();
      }
    };
  }, [user]);

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
        "Logout error:",
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

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex-grow text-xl font-semibold text-gray-700">
        {activeComponent}
      </div>
      <div className="flex items-center space-x-2">
        <Tooltip title="Notifications" placement="right">
          <Notifications
            className="text-black cursor-pointer"
            onClick={handleNotificationClick}
          />
        </Tooltip>
        <div
          className="flex items-center space-x-2 cursor-pointer relative"
          onClick={handleUserSectionClick}
        >
          <div className="flex items-center border border-[#968AFF] rounded-md px-4 py-2">
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
              className="absolute right-0 top-12 bg-white p-2 mt-3 border border-[#ccc] rounded-md shadow-lg"
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
        />
      )}
    </div>
  );
};

export default MainHeader;
