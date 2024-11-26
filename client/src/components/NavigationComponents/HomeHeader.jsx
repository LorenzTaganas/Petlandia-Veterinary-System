import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";
import Cookies from "js-cookie";

const HomeHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src="src/assets/Petlandia.png" alt="Logo" className="h-5 w-auto" />
        <h1 className="text-2xl font-bold text-gray-800"></h1>
      </div>

      {/* Navigation Section */}
      <nav className="hidden md:flex flex-grow justify-center space-x-8">
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-details"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services-details"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact-details"
              className="text-gray-600 hover:text-blue-500 font-medium transition duration-300"
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
            {isAuthenticated ? "Go to Dashboard" : "Book Now"}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
