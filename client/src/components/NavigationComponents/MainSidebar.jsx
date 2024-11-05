import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppointmentIcon from "@mui/icons-material/CalendarToday";
import MedicalHistoryIcon from "@mui/icons-material/MedicalServices";
import PaymentHistoryIcon from "@mui/icons-material/Payment";
import ReportIcon from "@mui/icons-material/Assessment";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import GroupIcon from "@mui/icons-material/Group";
import placeholder from "../../assets/placeholder.png";
import axiosInstance from "../../services/axiosInstance";
import { getUserProfile, getFullName } from "../../services/userService";

const MainSidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleProfileClick = () => setActiveComponent("Profile");
  const handleNotificationClick = (event) => {
    event.stopPropagation();
    console.log("Notification Clicked");
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

  const handleReturnHome = () => {
    navigate("/");
  };

  const renderSidebarItems = () => {
    const items = [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        onClick: () => setActiveComponent("Dashboard"),
      },
      {
        icon: <EventAvailableIcon />,
        label: "Scheduled Appointment",
        onClick: () => setActiveComponent("ScheduledAppointments"),
        roles: ["Staff"],
      },
      {
        icon: <AppointmentIcon />,
        label: "Appointment",
        onClick: () => setActiveComponent("AppointmentRequests"),
        roles: ["Client", "Admin"],
        subItems: [
          {
            label: "Requests",
            icon: <PendingActionsIcon />,
            onClick: () => setActiveComponent("AppointmentRequests"),
          },
          {
            label: "Scheduled",
            icon: <EventAvailableIcon />,
            onClick: () => setActiveComponent("ScheduledAppointments"),
          },
        ],
      },
      {
        icon: <MedicalHistoryIcon />,
        label: "Medical History",
        onClick: () => setActiveComponent("MedicalHistory"),
      },
      {
        icon: <PaymentHistoryIcon />,
        label: "Payment History",
        onClick: () => setActiveComponent("PaymentHistory"),
      },
      {
        icon: <ReportIcon />,
        label: "Reports",
        onClick: () => setActiveComponent("Reports"),
        roles: ["Staff", "Admin"],
      },
      {
        icon: <VideoLibraryIcon />,
        label: "Pet Grooming",
        onClick: () => setActiveComponent("PetGrooming"),
      },
      {
        icon: <GroupIcon />,
        label: "Account Management",
        onClick: () => setActiveComponent("AccountManagement"),
        roles: ["Admin"],
      },
    ];

    return items.map((item, index) => {
      if (item.roles && !item.roles.includes(user?.role)) return null;
      return (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          isOpen={isOpen}
          onClick={item.onClick}
          subItems={item.subItems}
        />
      );
    });
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300`}
    >
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } p-4`}
      >
        {isOpen && (
          <div className="flex justify-center flex-grow">
            <img src={placeholder} alt="Logo" className="h-8" />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`text-black ${!isOpen ? "mx-auto" : ""}`}
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>
      <hr className="border-gray-300 my-2" />
      <div
        className={`flex items-center p-4 ${
          !isOpen ? "justify-center" : "pl-4"
        } hover:bg-gray-200 cursor-pointer`}
        onClick={handleProfileClick}
      >
        <Tooltip title="Profile" disableHoverListener={isOpen}>
          <AccountCircleIcon
            fontSize="large"
            style={{ height: "48px", width: "48px" }}
          />
        </Tooltip>
        {isOpen && (
          <span className="text-gray-700 ml-4 text-lg">
            {getFullName(user)}{" "}
          </span>
        )}
        {isOpen && (
          <Tooltip title="Notifications" disableHoverListener={isOpen}>
            <NotificationsIcon
              className="ml-auto text-gray-700 cursor-pointer"
              onClick={handleNotificationClick}
            />
          </Tooltip>
        )}
      </div>
      <nav className="flex flex-col mt-4 space-y-2 flex-grow">
        {renderSidebarItems()}
      </nav>
      <div className="mt-auto space-y-2 mb-4">
        <SidebarItem
          icon={<HomeIcon />}
          label="Return Home"
          isOpen={isOpen}
          onClick={handleReturnHome}
        />
        <SidebarItem
          icon={<LogoutIcon className="text-red-500" />}
          label="Logout"
          isOpen={isOpen}
          textColor="text-red-500"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen, subItems, onClick, textColor }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);

  return (
    <div>
      <Tooltip title={label} disableHoverListener={isOpen}>
        <div
          className={`flex items-center p-2 hover:bg-gray-200 cursor-pointer ${
            !isOpen ? "justify-center" : "pl-6 pr-4"
          }`}
          onClick={subItems ? toggleSubmenu : onClick}
        >
          {icon}
          {isOpen && (
            <span className={`ml-4 text-gray-700 flex-grow ${textColor}`}>
              {label}
            </span>
          )}
          {isOpen && subItems && (
            <span className="text-gray-500">
              {isSubmenuOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </span>
          )}
        </div>
      </Tooltip>
      {isOpen && isSubmenuOpen && subItems && (
        <div className="ml-8 flex flex-col space-y-1">
          {subItems.map((subItem, index) => (
            <Tooltip
              key={index}
              title={subItem.label}
              disableHoverListener={isOpen}
            >
              <div
                className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"
                onClick={subItem.onClick}
              >
                {subItem.icon}
                <span className="ml-4 text-gray-700">{subItem.label}</span>
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
