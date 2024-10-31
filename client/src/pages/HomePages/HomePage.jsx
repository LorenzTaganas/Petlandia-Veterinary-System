import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.png";
import HomeHeader from "../../components/NavigationComponents/HomeHeader";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HomeHeader />
      <main>
        <section className="flex items-center h-[calc(100vh-64px)] bg-gray-400">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Home</h2>
            <p className="mt-2">Brief description of the Home section...</p>
          </div>
          <div className="w-1/2">
            <img
              src={placeholderImage}
              alt="Home"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-gray-200">
          <div className="w-1/2">
            <img
              src={placeholderImage}
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-2">Brief description of the About section...</p>
            <Link
              to="/about-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-gray-400">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Services</h2>
            <p className="mt-2">Brief description of the Services section...</p>
            <Link
              to="/services-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src={placeholderImage}
              alt="Services"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-gray-200">
          <div className="w-1/2">
            <img
              src={placeholderImage}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2">Brief description of the Contact section...</p>
            <Link
              to="/contact-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
