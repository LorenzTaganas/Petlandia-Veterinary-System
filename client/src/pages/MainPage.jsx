import React, { useState, useEffect } from "react";
import MainSidebar from "../components/NavigationComponents/MainSidebar";
import MainHeader from "../components/NavigationComponents/MainHeader";
import AppointmentRequests from "../components/MainComponents/AppointmentRequests";
import Dashboard from "../components/MainComponents/Dashboard";
import AppointmentHistory from "../components/MainComponents/AppointmentHistory";
import PaymentHistory from "../components/MainComponents/PaymentHistory";
import PetGrooming from "../components/MainComponents/PetGrooming";
import Profile from "../components/MainComponents/Profile";
import Reports from "../components/MainComponents/Reports";
import AppointmentSchedule from "../components/MainComponents/AppointmentSchedule";
import ChangePassword from "../components/MainComponents/ChangePassword";
import AccountManagement from "../components/MainComponents/AccountManagement";
import AdminAccounts from "../components/MainComponents/AdminAccounts";
import StaffAccounts from "../components/MainComponents/StaffAccounts";
import ClientAccounts from "../components/MainComponents/ClientAccounts";
import { getUserProfile } from "../services/userService";

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserRole(profile.role);
        if (profile.role === "Client") {
          setActiveComponent("AppointmentRequests");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatComponentName = (componentName) => {
    return componentName
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderActiveComponent = () => {
    if (loading) {
      return <div className="text-center ">Loading...</div>;
    }

    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard setActiveComponent={setActiveComponent} />;
      case "AppointmentRequests":
        return <AppointmentRequests />;
      case "AppointmentSchedule":
        return <AppointmentSchedule />;
      case "AppointmentHistory":
        return <AppointmentHistory />;
      case "PaymentHistory":
        return <PaymentHistory />;
      case "Reports":
        return <Reports />;
      case "Profile":
        return <Profile />;
      case "ChangePassword":
        return <ChangePassword />;
      case "FeaturedPets":
        return <PetGrooming />;
      case "AccountManagement":
        return <AccountManagement />;
      case "AdminAccounts":
        return <AdminAccounts />;
      case "StaffAccounts":
        return <StaffAccounts />;
      case "ClientAccounts":
        return <ClientAccounts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <MainSidebar
        setActiveComponent={setActiveComponent}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <MainHeader
          setActiveComponent={setActiveComponent}
          activeComponent={formatComponentName(activeComponent)}
        />
        <div className="flex-grow overflow-y-auto p-4">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
