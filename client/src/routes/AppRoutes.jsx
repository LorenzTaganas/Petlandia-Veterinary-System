import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutDetails from "../components/HomeComponents/AboutDetails";
import ServicesDetails from "../components/HomeComponents/ServicesDetails";
import ContactDetails from "../components/HomeComponents/ContactDetails";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import HomeLayout from "../layouts/HomeLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeLayout>
            <HomePage />
          </HomeLayout>
        }
      />
      <Route
        path="/about-details"
        element={
          <HomeLayout>
            <AboutDetails />
          </HomeLayout>
        }
      />
      <Route
        path="/services-details"
        element={
          <HomeLayout>
            <ServicesDetails />
          </HomeLayout>
        }
      />
      <Route
        path="/contact-details"
        element={
          <HomeLayout>
            <ContactDetails />
          </HomeLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<MainPage />} />
    </Routes>
  );
};

export default AppRoutes;
