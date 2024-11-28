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
  const [activeItem, setActiveItem] = useState("Dashboard"); // Track the active item
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

  const handleReturnHome = () => {
    setActiveItem("Return Home"); // Set active for Home
    navigate("/");
  };

  const handleItemClick = (label) => {
    setActiveComponent(label);
    setActiveItem(label); // Set the active item
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
        label: "Appointment Schedule",
        onClick: () => handleItemClick("AppointmentSchedule"),
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
            label: "Schedule",
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
          toggleNested={() => {
            if (item.label === "Appointment") {
              setIsAppointmentOpen(!isAppointmentOpen);
            } else if (item.label === "Account Management") {
              setIsAccountManagementOpen(!isAccountManagementOpen);
            }
          }}
          isAppointment={item.label === "Appointment"}
          isAppointmentOpen={isAppointmentOpen}
          isActive={activeItem === item.label} // Pass active state
          activeItem={activeItem} // Pass active item state
          setActiveItem={setActiveItem} // Pass setActiveItem function
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#7BB4FB]">
      <div
        className={`flex flex-col h-screen bg-[#B7D7FF] ${
          isOpen ? "w-72" : "w-20"
        } transition-width duration-300 overflow-y-auto `}
      >
        <div className="flex items-center justify-between p-3.5 bg-[#3A7DFF]">
          {isOpen && (
            <div className="flex justify-center flex-grow bg-[#3A7DFF]">
              <img src="src/assets/LGGO (1).png" alt="Logo" className="h-14" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className={`text-[#f3f3ec] ${!isOpen ? "mx-auto p-2.5" : ""}`}
          >
            <MenuIcon fontSize="large" />
          </button>
        </div>
        {/* <hr className="border-gray-300 my-2 text-[#f3f3ec]" /> */}
        <nav className="flex flex-col mt-4 space-y-2 flex-grow text-[#21458f]">
          {renderSidebarItems()}
        </nav>
        <div className="mt-auto space-y-2 mb-4 text-[#21458f]">
          <SidebarItem
            icon={<HomeIcon />}
            label="Return Home"
            isOpen={isOpen}
            onClick={handleReturnHome}
            isActive={activeItem === "Return Home"} // Pass active state
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
  isActive, // Receive active state
  activeItem, // Receive active item state
  setActiveItem, // Receive setActiveItem function
}) => {
  const handleClick = () => {
    if (subItems) {
      toggleNested();
    } else {
      onClick();
      setActiveItem(label); // Set the active item
    }
  };

  return (
    <div>
      <Tooltip
        title={!isOpen ? label : ""}
        disableHoverListener={isOpen}
        placement="right"
      >
        <div
          className={`flex items-center p-2 hover:bg-[#3A7DFF] rounded-xl cursor-pointer ${
            !isOpen ? "justify-center" : "pl-6 pr-4"
          } ${isActive ? "bg-[#3A7DFF] text-white" : ""}`} // Apply active styles
          onClick={handleClick}
        >
          {icon}
          {isOpen && (
            <span
              className={`ml-4 ${isActive ? "text-white" : "text-[#2B4980]"}`}
            >
              {label}
            </span>
          )}
          {/* sidebar text color */}
          {isAppointment && subItems && isOpen && (
            <div className="ml-auto">
              {isAppointmentOpen ? (
                <ChevronDownIcon className="text-[#2B4980]" /> //drop down color
              ) : (
                <ChevronRightIcon className="text-[#2B4980]" />
              )}
            </div>
          )}
          {subItems && isOpen && !isAppointment && (
            <div className="ml-auto">
              {isOpenNested ? (
                <ChevronDownIcon className="text-[#2B4980]" /> //drop down color
              ) : (
                <ChevronRightIcon className="text-[#2B4980]" />
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
                className={`flex items-center p-2 hover:bg-[#3A7DFF] rounded-xl cursor-pointer ${
                  activeItem === subItem.label ? "bg-[#3A7DFF] text-white" : ""
                }`} // Apply active styles to sub-items
                onClick={() => {
                  subItem.onClick();
                  setActiveItem(subItem.label); // Set the active sub-item
                }}
              >
                {subItem.icon}
                {isOpen && (
                  <span
                    className={`ml-4 ${
                      activeItem === subItem.label
                        ? "text-white"
                        : "text-[#2B4980]"
                    }`}
                  >
                    {subItem.label}
                  </span>
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
