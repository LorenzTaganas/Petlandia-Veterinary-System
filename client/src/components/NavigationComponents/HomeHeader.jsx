import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";

const HomeHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 text-black">
      <div className="flex items-center">
        <img src={placeholderImage} alt="Logo" className="h-10" />
      </div>
      <nav className="flex-grow text-center">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-details" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/services-details" className="hover:underline">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact-details" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Book Now
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
