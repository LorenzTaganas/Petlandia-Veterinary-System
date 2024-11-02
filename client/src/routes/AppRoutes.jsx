import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePages/HomePage";
import AboutDetails from "../components/HomeComponents/AboutDetails";
import ServicesDetails from "../components/HomeComponents/ServicesDetails";
import ContactDetails from "../components/HomeComponents/ContactDetails";
import LoginPage from "../pages/Auth/LoginPage";
import DashboardPage from "../pages/DashboardPages/DashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-details" element={<AboutDetails />} />
      <Route path="/services-details" element={<ServicesDetails />} />
      <Route path="/contact-details" element={<ContactDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
