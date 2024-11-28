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
    iconSize: [100, 100],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-100">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Welcome to Petlandia</h2>
            <p className="mt-2">
              “At PetLandia Vets Malolos, our Veterinary Management System
              streamlines pet care with online booking, automated reminders, and
              detailed medical record management, ensuring a hassle-free
              experience for both pets and owners.”
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="src/assets/TEST PICTURE.png"
              alt="Home"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-200">
          <div className="w-1/2">
            <img
              src="src/assets/dogs2.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-2">
              At PetLandia Vets Malolos, we are dedicated to providing
              exceptional veterinary care in a compassionate and professional
              environment. Our team of experienced veterinarians and staff is
              committed to ensuring the well-being of your pets, offering a full
              range of services from routine check-ups and vaccinations to
              specialized treatments and surgeries.
            </p>
            <Link
              to="/about-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-100">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Services</h2>
            <p className="mt-2">
              At PetLandia Vets Malolos, we offer a comprehensive range of
              veterinary services to ensure your pet's health and well-being.
              Our team is committed to providing the highest standard of care
              with a personalized approach for every pet.
            </p>
            <Link
              to="/services-details"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Learn More
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="src/assets/dogs3.jpg"
              alt="Services"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex items-center h-[calc(100vh-64px)] bg-blue-200">
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
