import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { getUserProfile, getFullName } from "../../services/userService";
import axiosInstance from "../../services/axiosInstance";

const MainHeader = ({ setActiveComponent, activeComponent }) => {
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    console.log("Notification clicked");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex-grow text-xl font-semibold text-gray-700">
        {activeComponent}
      </div>
      <div className="flex items-center space-x-2">
        <Tooltip title="Notifications" placement="right">
          <NotificationsIcon
            className="text-black cursor-pointer"
            onClick={handleNotificationClick}
          />
        </Tooltip>
        <div
          className="flex items-center space-x-2 cursor-pointer relative"
          onClick={handleUserSectionClick}
        >
          <div className="flex items-center border border-[#968AFF] rounded-md px-4 py-2">
            <AccountCircleIcon fontSize="large" />
            {fullName && <span className="ml-2">{fullName}</span>}
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
                <PersonIcon />
                <span>View Profile</span>
              </button>
              <button
                onClick={handleChangePasswordClick}
                className="w-full text-gray-700 flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <LockIcon />
                <span>Change Password</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-red-500 flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <ExitToAppIcon />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
