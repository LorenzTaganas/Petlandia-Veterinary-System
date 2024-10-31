import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePages/HomePage";
import AboutDetails from "../components/HomeComponents/AboutDetails";
import ServicesDetails from "../components/HomeComponents/ServicesDetails";
import ContactDetails from "../components/HomeComponents/ContactDetails";
import LoginPage from "../pages/Auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-details" element={<AboutDetails />} />
      <Route path="/services-details" element={<ServicesDetails />} />
      <Route path="/contact-details" element={<ContactDetails />} />
      <Route path="/login" element={<LoginPage />} />{" "}
    </Routes>
  );
};

export default AppRoutes;
