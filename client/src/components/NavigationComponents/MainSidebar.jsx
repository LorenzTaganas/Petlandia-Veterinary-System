import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarToday as AppointmentIcon,
  WorkHistory as WorkHistoryIcon,
  Payment as PaymentHistoryIcon,
  Assessment as ReportIcon,
  Home as HomeIcon,
  PendingActions as PendingActionsIcon,
  EventAvailable as EventAvailableIcon,
  VideoLibrary as VideoLibraryIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Person as PersonIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ChevronDownIcon,
} from "@mui/icons-material";

import placeholder from "../../assets/placeholder.png";
import { getUserProfile } from "../../services/userService";

const MainSidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAccountManagementOpen, setIsAccountManagementOpen] = useState(false);
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

  const handleReturnHome = () => navigate("/");

  const handleItemClick = (label) => {
    setActiveComponent(label);
  };

  const renderSidebarItems = () => {
    const items = [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        onClick: () => handleItemClick("Dashboard"),
        roles: ["Staff", "Admin"],
      },
      {
        icon: <EventAvailableIcon />,
        label: "Scheduled Appointment",
        onClick: () => handleItemClick("ScheduledAppointments"),
        roles: ["Staff"],
      },
      {
        icon: <AppointmentIcon />,
        label: "Appointment",
        onClick: () => setIsAppointmentOpen(!isAppointmentOpen),
        roles: ["Client", "Admin"],
        subItems: [
          {
            label: "Requests",
            icon: <PendingActionsIcon />,
            onClick: () => handleItemClick("AppointmentRequests"),
          },
          {
            label: "Scheduled",
            icon: <EventAvailableIcon />,
            onClick: () => handleItemClick("AppointmentSchedule"),
          },
        ],
        isOpen: isAppointmentOpen,
      },
      {
        icon: <WorkHistoryIcon />,
        label: "Appointment History",
        onClick: () => handleItemClick("AppointmentHistory"),
      },
      {
        icon: <PaymentHistoryIcon />,
        label: "Payment History",
        onClick: () => handleItemClick("PaymentHistory"),
      },
      {
        icon: <ReportIcon />,
        label: "Reports",
        onClick: () => handleItemClick("Reports"),
        roles: ["Staff", "Admin"],
      },
      {
        icon: <VideoLibraryIcon />,
        label: "Pet Grooming",
        onClick: () => handleItemClick("PetGrooming"),
      },
      {
        icon: <GroupIcon />,
        label: "Account Management",
        onClick: () => setIsAccountManagementOpen(!isAccountManagementOpen),
        roles: ["Admin"],
        subItems: [
          {
            label: "Admin Accounts",
            icon: <AdminPanelSettingsIcon />,
            onClick: () => handleItemClick("AdminAccounts"),
          },
          {
            label: "Staff Accounts",
            icon: <PersonAddIcon />,
            onClick: () => handleItemClick("StaffAccounts"),
          },
          {
            label: "Client Accounts",
            icon: <PersonIcon />,
            onClick: () => handleItemClick("ClientAccounts"),
          },
        ],
        isOpen: isAccountManagementOpen,
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
          isOpenNested={item.isOpen}
          toggleNested={item.onClick}
          isAppointment={item.label === "Appointment"}
          isAppointmentOpen={isAppointmentOpen}
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#CCC7FF]">
      <div
        className={`flex flex-col h-screen bg-[#CCC7FF] ${
          isOpen ? "w-72" : "w-20"
        } transition-width duration-300`}
      >
        <div className="flex items-center justify-between p-4">
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
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  isOpen,
  subItems,
  isOpenNested,
  toggleNested,
  onClick,
  isAppointment,
  isAppointmentOpen,
}) => {
  return (
    <div>
      <Tooltip
        title={!isOpen ? label : ""}
        disableHoverListener={isOpen}
        placement="right"
      >
        <div
          className={`flex items-center p-2 hover:bg-gray-200 cursor-pointer ${
            !isOpen ? "justify-center" : "pl-6 pr-4"
          }`}
          onClick={subItems ? toggleNested : onClick}
        >
          {icon}
          {isOpen && <span className="ml-4 text-gray-700">{label}</span>}
          {isAppointment && subItems && isOpen && (
            <div className="ml-auto">
              {isAppointmentOpen ? (
                <ChevronDownIcon className="text-black" />
              ) : (
                <ChevronRightIcon className="text-black" />
              )}
            </div>
          )}
          {subItems && isOpen && !isAppointment && (
            <div className="ml-auto">
              {isOpenNested ? (
                <ChevronDownIcon className="text-black" />
              ) : (
                <ChevronRightIcon className="text-black" />
              )}
            </div>
          )}
        </div>
      </Tooltip>
      {subItems && isOpenNested && (
        <div className="ml-10 space-y-2">
          {subItems.map((subItem, index) => (
            <Tooltip
              key={index}
              title={isOpen ? "" : subItem.label}
              disableHoverListener={isOpen}
              placement="right"
            >
              <div
                className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"
                onClick={subItem.onClick}
              >
                {subItem.icon}
                {isOpen && (
                  <span className="ml-4 text-gray-700">{subItem.label}</span>
                )}
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
