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

        <section className="h-96">
          <h2 className="text-2xl font-bold text-center">Our Location</h2>
          <div className="w-full h-full relative">
            <MapContainer
              center={[14.8793539, 120.8259689]}
              zoom={13}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[14.8793539, 120.8259689]}
                icon={customMarkerIcon}
              >
                <Popup>Malolos, Bulacan</Popup>
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
