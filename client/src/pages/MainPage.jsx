import React, { useState } from "react";
import MainSidebar from "../components/NavigationComponents/MainSidebar";
import AccountManagement from "../components/MainComponents/AccountManagement";
import AppointmentRequests from "../components/MainComponents/AppointmentRequests";
import Dashboard from "../components/MainComponents/Dashboard";
import MedicalHistory from "../components/MainComponents/MedicalHistory";
import PaymentHistory from "../components/MainComponents/PaymentHistory";
import PetGrooming from "../components/MainComponents/PetGrooming";
import Profile from "../components/MainComponents/Profile";
import Reports from "../components/MainComponents/Reports";
import ScheduledAppointments from "../components/MainComponents/ScheduledAppointments";

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "AppointmentRequests":
        return <AppointmentRequests />;
      case "ScheduledAppointments":
        return <ScheduledAppointments />;
      case "MedicalHistory":
        return <MedicalHistory />;
      case "PaymentHistory":
        return <PaymentHistory />;
      case "Reports":
        return <Reports />;
      case "Profile":
        return <Profile />;
      case "PetGrooming":
        return <PetGrooming />;
      case "AccountManagement":
        return <AccountManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <MainSidebar setActiveComponent={setActiveComponent} />
      <div className="flex-grow p-4">{renderActiveComponent()}</div>
    </div>
  );
};

export default MainPage;
