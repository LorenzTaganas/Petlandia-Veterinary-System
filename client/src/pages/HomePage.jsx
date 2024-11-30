import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import markerIcon from "../assets/mapmarker.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const HomePage = () => {
  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-grow">
        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-100">
          <div className="w-1/2 p-8">
            <h2 className="text-4xl font-bold text-blue-900">
              Welcome to Petlandia
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              At PetLandia Vets Malolos, our Veterinary Management System
              streamlines pet care with online booking, automated reminders, and
              detailed medical record management. We ensure a hassle-free
              experience for both pets and their owners.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="src/assets/TEST PICTURE.png"
              alt="Home"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-200">
          <div className="w-1/2">
            <img
              src="src/assets/dogs2.jpg"
              alt="About"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-4xl font-bold text-blue-900">About Us</h2>
            <p className="mt-4 text-lg text-gray-700">
              At PetLandia Vets Malolos, we are dedicated to providing
              exceptional veterinary care in a compassionate and professional
              environment. Our experienced team of veterinarians and staff is
              committed to ensuring the well-being of your pets, offering a full
              range of services from routine check-ups and vaccinations to
              specialized treatments and surgeries.
            </p>
            <Link
              to="/about-details"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-100">
          <div className="w-1/2 p-8">
            <h2 className="text-4xl font-bold text-blue-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-700">
              At PetLandia Vets Malolos, we offer a comprehensive range of
              veterinary services to ensure your pet's health and well-being.
              Our team is committed to providing the highest standard of care
              with a personalized approach for every pet.
            </p>
            <Link
              to="/services-details"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="src/assets/dogs3.jpg"
              alt="Services"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-200">
          <div className="w-1/2 p-8">
            <h2 className="text-4xl font-bold text-blue-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-700">
              At PetLandia Vets Malolos, we're here to help with all your pet
              care needs. Whether you have questions about our services or want
              to schedule an appointment, feel free to reach out to us through
              any of the following options.
            </p>
            <Link
              to="/contact-details"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
          <section className="h-96">
            <h2 className="text-4xl font-bold text-center text-blue-900">
              Our Location
            </h2>
            <div className="w-full h-full relative">
              <MapContainer
                center={[14.855481028466446, 120.81201212576464]}
                zoom={13}
                className="w-full h-full rounded-lg shadow-lg relative z-10"
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
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-6">
          {/* Location Section */}
          <div>
            <p className="font-bold">Location</p>
            <p>
              Sapphire Street, Capitol View Park Subdivision, Malolos,
              Philippines
            </p>
            <p>Contact: (044) 802 7334 or 09658063229</p>
            <p>Email: petlandiavets@gmail.com</p>
          </div>

          {/* Welcome Section */}
          <div className="container mx-auto text-center">
            <p className="font-bold">Welcome to Petlandia!</p>
            <p>#AlagangPetlandia</p>
            <p>#VetsYouCanTrust</p>
            <p className="pt-5">
              &copy; {new Date().getFullYear()} Petlandia Veterinary. All rights
              reserved.
            </p>
          </div>

          {/* Operating Hours Section */}
          <div className="pl-10 ml-10">
            <p className="font-bold">Operating Hours</p>
            <p>Monday-Saturday: 9:00 AM - 6:00 PM</p>
            <p>Sunday: 12:00 NN - 6:00 PM</p>
            <p className="font-bold mt-4">Emergency Hours (by Appointment)</p>
            <p>6:00 PM - 6:00 AM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
