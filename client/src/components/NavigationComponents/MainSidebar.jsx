import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MainSidebar = () => {
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
  const handleProfileClick = () => console.log("Profile Clicked");
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
        onClick: () => console.log("Dashboard Clicked"),
      },
      {
        icon: <AppointmentIcon />,
        label: "Appointment",
        onClick: () => console.log("Appointment Requests Clicked"),
        roles: ["Client", "Admin"],
        subItems: [
          {
            label: "Requests",
            icon: <PendingActionsIcon />,
            onClick: () => console.log("Requests Clicked"),
          },
          {
            label: "Scheduled",
            icon: <EventAvailableIcon />,
            onClick: () => console.log("Scheduled Clicked"),
          },
        ],
      },
      {
        icon: <MedicalHistoryIcon />,
        label: "Medical History",
        onClick: () => console.log("Medical History Clicked"),
      },
      {
        icon: <PaymentHistoryIcon />,
        label: "Payment History",
        onClick: () => console.log("Payment History Clicked"),
      },
      {
        icon: <ReportIcon />,
        label: "Reports",
        onClick: () => console.log("Reports Clicked"),
        roles: ["Doctor", "Admin"],
      },
      {
        icon: <VideoLibraryIcon />,
        label: "Pet Grooming",
        onClick: () => console.log("Pet Grooming Clicked"),
      },
      {
        icon: <GroupIcon />,
        label: "Account Management",
        onClick: () => console.log("Account Management Clicked"),
        roles: ["Admin"],
      },
      {
        icon: <EventAvailableIcon />,
        label: "Scheduled Appointment",
        onClick: () => console.log("Scheduled Appointment Clicked"),
        roles: ["Doctor"],
      },
    ];

    return items.map((item, index) => {
      if (item.roles) {
        if (!item.roles.includes(user?.role)) return null;
      }
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
        <AccountCircleIcon
          fontSize="large"
          style={{ height: "48px", width: "48px" }}
        />
        {isOpen && (
          <span className="text-gray-700 ml-4 text-lg">
            {getFullName(user)}{" "}
          </span>
        )}
        {isOpen && (
          <NotificationsIcon
            className="ml-auto text-gray-700 cursor-pointer"
            onClick={handleNotificationClick}
          />
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
      {isOpen && isSubmenuOpen && subItems && (
        <div className="pl-10">
          {subItems.map((subItem, index) => (
            <div
              key={index}
              className="flex items-center p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
              onClick={subItem.onClick}
            >
              {subItem.icon}
              <span className="ml-4">{subItem.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
