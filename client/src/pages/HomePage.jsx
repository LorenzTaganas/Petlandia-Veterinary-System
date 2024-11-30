import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import placeholderImage from "../assets/placeholder.png";
import markerIcon from "../assets/mapmarker.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const HomePage = () => {
  // Authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [100, 100],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });



  return (
    <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      
    {/* First section (WELCOME)  */}
    <section className="flex items-center h-[calc(100vh-64px)]">
        <div
          className="relative w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('src/assets/dogoo32.png')" }}
        >
          <div className="absolute inset-0 bg-black opacity-0"></div>

          <div className="absolute right-20 top-20 text-black p-6 mt-40">
              <h2 className="font-paytone max-w-xl text-cus text-black text-shadow-md 
                        transition duration-500 ease-in-out transform hover:scale-105">
                Welcome to Pe<span className="text-red-500 font-custom font-bold">t</span>landia Veterinary Clinic
              </h2>
              <p className="font txt mt-12 max-w-lg text-lg leading-relaxed text-gray text-shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
                "PetCare Made Easy: Seamless Booking, Timely Reminders, and Effortless Health Tracking for Your Furry Friends."
              </p>
            {/* <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
              Request an Appointment
            </button> */}
          </div>
        </div>
    </section>

    {/* Floating Book now(REQUEST AN APPOINTMENT) */}
    <section className="h-[60vh] bg-[#FCF9F4] flex items-center justify-center"> 
      
      <div className="mt-6  rounded-3xl shadow-now w-3/4 h-1/2 bg-white relative transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-custom">

        <div className="absolute inset-0 bg-cover bg-center rounded-3xl" style={{ backgroundImage: "url('src/assets/COTSAN.png')" }}>

          <div className="p-bnow absolute left-6 top-10">
            
            <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
              Book Your Appointment <span className="text 38px text-[#1666f7] bg-white p-pads m-mar shadow-now">Now</span>
            </h1>

            <p className="mt-4 font-txt text-18px text-[#3E3D3D] text-shadow-lg transition">
              We are accepting new patients. Please call to book an appointment.
            </p>

            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
                {isAuthenticated ? "Request an Appointment" : "Request an Appointment"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Second page (ABOUT) */}
    <section className=" bg-gradient-to-r from-indigo-300 to-indigo-100 flex items-center h-[calc(100vh-64px)]">
        <div className="w-1/2 ml-12 ">
          <img
            src="src/assets/dogs3.jpg"
            alt="Services"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <div className="ml-8 w-1/2 pl-20 mt-[-50px]">
          <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
            <span className="text 38px text-[#1666f7] bg-white p-pads m-mar shadow-now">About us</span>
          </h1>

          <p className="font-txt mt-8 max-w-lg transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
            At PetLandia Vets Malolos, we offer a comprehensive range of veterinary services to ensure your pet's health and well-being. Our team is committed to providing the highest standard of care with a personalized approach for every pet.
          </p>

          <button className=" mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
              <Link to="/about-details" className="flex flex-col h-full">
                  Learn More
              </Link>
          </button>
          </div>
    </section>

    {/* Third Section (SERVICES)*/}
    <section className="h-[calc(100vh-64px)] bg-gradient-to-r from-indigo-300 to-indigo-100 flex items-center justify-center">
        <div className="flex w-full p-8">

          {/* Left Side: Title and Paragraph */}
              <div className="ml-8 w-1/2 pl-20">
                <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                  <span className="text 38px text-[#1666f7] bg-white p-pads m-mar shadow-now">About us</span>
                </h1>

                <p className="font-txt mt-8 max-w-lg transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
                  At PetLandia Vets Malolos, we offer a comprehensive range of veterinary services to ensure your pet's health and well-being. Our team is committed to providing the highest standard of care with a personalized approach for every pet.
                </p>

                <button className=" mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
                    <Link to="/services-details" className="flex flex-col h-full">
                        Learn More
                    </Link>
                </button>
                </div>

          <div className="flex flex-col w-1/2 space-y-6 h-full">
            {/* Top Row: Checkup and Grooming */}
            <div className="flex space-x-6 h-[40vh] w-full">
              {/* Column 1: Checkup */}
              <div className="bg-white p-6 rounded-[20px] flex-grow shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-custom">
                <Link to="/services-details" className="flex flex-col h-full">
                  <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                    Checkup
                  </h1>
                </Link>
              </div>

              {/* Column 2: Grooming */}
              <div className="bg-white p-6 rounded-[20px] flex-grow shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-custom">
                <Link to="/services-details" className="flex flex-col h-full">
                  <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                    Grooming
                  </h1>
                </Link>
              </div>
            </div>

            {/* Bottom Row: Treatment */}
            <div className="bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-custom">
              <Link to="/services-details" className="flex flex-col h-full">
                <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                  Treatment
                </h1>
              </Link>
            </div>
          </div>
        </div>
    </section>

    {/* Fourth Section (CONTACTS)*/}
    <section className="bg-gradient-to-r from-indigo-300 to-indigo-100 flex items-center h-[calc(100vh-64px)]">
          <div className="w-1/2">
            <img
              src="src/assets/TEST PICTURE.png"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2">
              At PetLandia Vets Malolos, we're here to help with all your pet
              care needs. Whether you have questions about our services or want
              to schedule an appointment, feel free to reach out to us through
              any of the following options
            </p>
            <Link
              to="/contact-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
    </section>

    <section className="h-96">
          <h2 className="text-2xl font-bold text-center">Our Location</h2>
          <div className="w-full h-full relative">
            <MapContainer
              center={[14.855481028466446, 120.81201212576464]}
              zoom={13}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[14.855481028466446, 120.81201212576464]}
                icon={customMarkerIcon}
              >
                <Popup>PetLandia Malolos, Bulacan</Popup>
              </Marker>
            </MapContainer>
          </div>
    </section>
      </main>

    <footer className="bg-gray-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Petlandia Veterinary. All rights
            reserved.
          </p>
        </div>
    </footer>
    </div>
  );
};

export default HomePage;
