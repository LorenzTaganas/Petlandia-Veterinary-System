import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import placeholderImage from "../assets/placeholder.png";
import markerIcon from "../assets/mapmarker.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ChatbotModal from "../components/modals/ChatbotModals/ChatbotModal"; // Import the ChatbotModal component

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Define the state

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [150, 150],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    color: [],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section
          id="1st"
          className="mt-16 flex items-center h-[calc(100vh-64px)]"
        >
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/dogoo32.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-0"></div>

            <div className="absolute right-20 top-20 text-black p-6 mt-40">
              <h2 className="font-paytone max-w-xl text-cus text-black text-shadow-md">
                Welcome to Pe
                <span className="text-red-500 font-custom font-bold">t</span>
                landia Veterinary Clinic
              </h2>
              <h2></h2>
              <p className="font txt mt-12 max-w-lg text-lg leading-relaxed text-gray text-shadow-lg">
                "PetCare Made Easy: Seamless Booking, Timely Reminders, and
                Effortless Health Tracking for Your Furry Friends."
              </p>
            </div>
          </div>
        </section>

        <section className="h-[60vh] bg-[#FDFCFC] flex items-center justify-center">
          <div className="mt-6  rounded-3xl shadow-up w-3/4 h-1/2 bg-white relative">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: "url('src/assets/COTSAN.png')" }}
            >
              <div className="p-bnow absolute left-6 top-10">
                <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                  Book Your Appointment{" "}
                  <span className="text 38px text-[#1666f7] pl-3 m-mar">
                    Now
                  </span>
                </h1>

                <p className="mt-4 font-txt text-18px text-[#3E3D3D] text-shadow-lg">
                  We are accepting new patients. Please call to book an
                  appointment.
                </p>

                <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                  <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
                    {isAuthenticated
                      ? "Request an Appointment"
                      : "Request an Appointment"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-indigo-100 to-indigo-40 flex items-center h-[calc(100vh-64px)]">
          <div className="h-3/4 w-1/2 ml-24">
            <img
              src="src/assets/kyot.jpg"
              alt="Services"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          <div className="pl-10 ml-12 w-1/2">
            <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
              <span className="text-[18px] text-[#1666f7] bg-white p-pads m-mar shadow-now">
                ABOUT US
              </span>
            </h1>

            <h1 className="p-0 max-w-lg mt-4 font-paytone text-48 font-bold text-[#3E3D3D] text-3px text-shadow-md">
              A Trustworthy Veterinary
            </h1>

            <p className="text-[#616161] font-txt mt-4 max-w-md transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
              PetLandia Vet Malolos offers expert veterinary care,<br></br> from
              routine check-ups to specialized treatments, with compassion and
              professionalism.
            </p>

            <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
              <Link to="/about-details" className="flex flex-col h-full">
                Learn More
              </Link>
            </button>
          </div>
        </section>

        <section className="h-[calc(100vh-64px)] bg-gradient-to-t from-indigo-100 to-indigo-40 flex items-center justify-center">
          <div className="flex w-full max-w-screen-xl px-12 ">
            <div className="w-1/2 mt-20">
              <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md">
                <span className="text-[18px] text-[#1666f7] bg-white p-pads m-mar shadow-now">
                  OUR SERVICES
                </span>
              </h1>

              <h1 className="p-0 max-w-lg mt-4 font-paytone text-48 font-bold text-[#3E3D3D] text-3px text-shadow-md">
                Alagang Petlandia!
              </h1>

              <p className="text-[#616161] font-txt mt-4 max-w-md transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
                Our clinic offers a comprehensive range of veterinary services
                to ensure your pet's health and well-being. Our team is
                committed to providing the highest standard of care with a
                personalized approach for every pet..
              </p>

              <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
                <Link to="/services-details">Learn More</Link>
              </button>
            </div>

            <div className="flex flex-col w-1/2 space-y-6 h-full ml-10">
              <div className="flex space-x-6 h-[35vh] w-full whitespace-normal">
                <div className="bg-white p-6 rounded-[20px] flex-grow shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up flex flex-col">
                  <Link to="/services-details" className="flex flex-col h-full">
                    <div className="w-60 h-60 p-3 rounded-full flex justify-center items-center overflow-hidden">
                      <img
                        src="src/assets/checkup.png"
                        alt="Services"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md text-center">
                      Checkup
                    </h1>
                    <p className="pl-6 text-gray-800 font-txt max-w-xs">
                      We offer expert veterinary checkups to keep your pets
                      healthy
                    </p>
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-[20px] flex-grow shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up flex flex-col">
                  <Link
                    to="/services-details"
                    className="flex flex-col h-full justify-center items-center"
                  >
                    <div className="w-60 h-60 p-3  rounded-full flex justify-center items-center overflow-hidden">
                      <img
                        src="src/assets/grooming.png"
                        alt="Services"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-3px text-shadow-md text-center">
                      Grooming
                    </h1>

                    <p className="pl-6 text-gray-800 font-txt max-w-xs">
                      We offer grooming services for a clean, comfortable, and
                      stress-free experience.
                    </p>
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 h-[35vh] rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up flex items-center">
                <div className="ml-8 w-40 h-40 rounded-[20px] overflow-hidden ">
                  <img
                    src="src/assets/treat.png"
                    alt="Treatment Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-14 w-1/2 flex items-center justify-start ">
                  <Link to="/services-details" className="flex flex-col h-full">
                    <h1 className="font-paytone text-3xl font-bold text-[#3E3D3D] text-shadow-md">
                      Treatment
                    </h1>
                    <p className="text-gray-800 font-txt max-w-xs mt-4">
                      We provide expert veterinary treatments, including
                      diagnostics and care, for your pet's health and recovery
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[calc(100vh-64px)] bg-gradient-to-b from-indigo-0 to-indigo-0 flex flex-col items-center">
          <h1 className="flex font-paytone text-48 font-bold text-blue-800 mb-6 mt-20">
            We look forward to seeing you!
          </h1>
          <p className="text-[#616161] font-txt text-center max-w-2xl">
            PetLandia is always here to help with your pet care needs. Whether
            you have questions about our services or want to schedule an
            appointment, feel free to reach out to us through any of the
            following options
          </p>

          <div className="mt-20 flex w-3/4 justify-center space-x-20">
            <div className="bg-transparent w-1/2 h flex flex-col justify-center items-center text-white rounded-lg p-4">
              <div className="w-28 h-28 p-6 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  src="src/assets/wpoint.png"
                  alt="Services"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="mt-10 text-black font-semibold text-[30px] mb-4">
                Address
              </h4>

              <div className="text-black text-center">
                <p>
                  Sapphire Street
                  <br />
                  Capitol View Park Subdivision
                  <br />
                  Malolos, Philippines
                </p>
              </div>
            </div>

            <div className="bg-transparent w-1/2 h flex flex-col justify-center items-center text-white rounded-lg p-4">
              <div className="mt-4 w-28 h-28 pl-[25px] p-6 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  src="src/assets/time.png"
                  alt="Services"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className=" mt-10 text-black font-semibold text-[30px] mb-4">
                Hours
              </h4>

              <div className="text-black text-center">
                <p>
                  <b>Mon-Sat:</b> 9:00 AM - 6:00 PM
                  <br />
                  <b>Sunday:</b> 12:00 NN - 6:00 PM
                  <br />
                  <b>IN-CASE OF EMERGENCY:</b> 6:00 PM - 6:00 AM
                </p>
              </div>
            </div>

            <div className="bg-transparent w-1/2 h flex flex-col justify-center items-center text-white rounded-lg p-4">
              <div className="w-28 h-28 p-6 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  src="src/assets/phone.png"
                  alt="Services"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="mt-10 text-black font-semibold text-[30px] mb-4">
                Contact Info
              </h4>

              <div className="text-black text-center">
                <p>
                  <b>Call:</b> 0965-8063-229
                  <br />
                  <b>Fax:</b> (044) 802 7334
                  <br />
                  <b>Email:</b> petlandiavets@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="h-96 mt-20">
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
      <footer className="bg-gray-800 text-white py-8 mt-4 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-6">
          <div>
            <p className="font-bold">Location</p>
            <p>
              Sapphire Street, Capitol View Park Subdivision, Malolos,
              Philippines
            </p>
            <p>Contact: (044) 802 7334 or 09658063229</p>
            <p>Email: petlandiavets@gmail.com</p>
          </div>

          <div className="container mx-auto text-center">
            <p className="font-bold">Welcome to Petlandia!</p>
            <p>#AlagangPetlandia</p>
            <p>#VetsYouCanTrust</p>
            <p className="pt-5">
              &copy; {new Date().getFullYear()} Petlandia Veterinary. All rights
              reserved.
            </p>
          </div>

          <div className="pl-10 ml-10">
            <p className="font-bold">Operating Hours</p>
            <p>Monday-Saturday: 9:00 AM - 6:00 PM</p>
            <p>Sunday: 12:00 NN - 6:00 PM</p>
            <p className="font-bold mt-4">Emergency Hours (by Appointment)</p>
            <p>6:00 PM - 6:00 AM</p>
          </div>
        </div>
      </footer>
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 text-lg rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Chat with us
      </button>
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />{" "}
    </div>
  );
};

export default HomePage;
