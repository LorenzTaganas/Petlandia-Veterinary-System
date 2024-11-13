import React, { useState } from "react";
import MainSidebar from "../components/NavigationComponents/MainSidebar";
import MainHeader from "../components/NavigationComponents/MainHeader";
import AppointmentRequests from "../components/MainComponents/AppointmentRequests";
import Dashboard from "../components/MainComponents/Dashboard";
import MedicalHistory from "../components/MainComponents/MedicalHistory";
import PaymentHistory from "../components/MainComponents/PaymentHistory";
import PetGrooming from "../components/MainComponents/PetGrooming";
import Profile from "../components/MainComponents/Profile";
import Reports from "../components/MainComponents/Reports";
import AppointmentSchedule from "../components/MainComponents/AppointmentSchedule";
import ChangePassword from "../components/MainComponents/ChangePassword";
import AdminAccounts from "../components/MainComponents/AdminAccounts";
import StaffAccounts from "../components/MainComponents/StaffAccounts";
import ClientAccounts from "../components/MainComponents/ClientAccounts";
// import AccountManagement from "../components/MainComponents/AccountManagement";

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const formatComponentName = (componentName) => {
    return componentName
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "AppointmentRequests":
        return <AppointmentRequests />;
      case "AppointmentSchedule":
        return <AppointmentSchedule />;
      case "MedicalHistory":
        return <MedicalHistory />;
      case "PaymentHistory":
        return <PaymentHistory />;
      case "Reports":
        return <Reports />;
      case "Profile":
        return <Profile />;
      case "ChangePassword":
        return <ChangePassword />;
      case "PetGrooming":
        return <PetGrooming />;
      case "AdminAccounts":
        return <AdminAccounts />;
      case "StaffAccounts":
        return <StaffAccounts />;
      case "ClientAccounts":
        return <ClientAccounts />;
      // case "AccountManagement":
      //   return <AccountManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <MainSidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 flex flex-col overflow-hidden">
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
