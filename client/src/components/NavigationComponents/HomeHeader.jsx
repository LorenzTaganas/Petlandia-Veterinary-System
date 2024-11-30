import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";
import Cookies from "js-cookie";

const HomeHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-3">
        <img src="src/assets/LGGO (2).png" alt="Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-bold text-gray-800"></h1>
      </div>
      <nav className="hidden md:flex flex-grow justify-center space-x-8">
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className={`text-gray-600 hover:text-blue-700 font-medium transition duration-300 ${
                activeLink === "/" ? " text-blue-600" : ""
              }`}
              onClick={() => setActiveLink("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-details"
              className={`text-gray-600 hover:text-blue-500 font-medium transition duration-300 ${
                activeLink === "/about-details" ? " text-blue-600" : ""
              }`}
              onClick={() => setActiveLink("/about-details")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services-details"
              className={`text-gray-600 hover:text-blue-500 font-medium transition duration-300 ${
                activeLink === "/services-details" ? "text-blue-600" : ""
              }`}
              onClick={() => setActiveLink("/services-details")}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact-details"
              className={`text-gray-600 hover:text-blue-500 font-medium transition duration-300 ${
                activeLink === "/contact-details" ? " text-blue-600" : ""
              }`}
              onClick={() => setActiveLink("/contact-details")}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Button Section */}
      <div className="flex items-center">
        <Link to={isAuthenticated ? "/dashboard" : "/login"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300">
            {isAuthenticated ? "Go to Dashboard" : "Book now"}
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button (for small screens) */}
      <div className="md:hidden">
        <button className="text-gray-600 hover:text-blue-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
