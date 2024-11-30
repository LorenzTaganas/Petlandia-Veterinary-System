import React from "react";

const AboutDetails = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-indigo-300 flex flex-col items-center pt-10">
      <div className="max-w-5xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed text-center mb-8">
          Welcome to <span className="font-semibold">PetLandia Vets</span>, your
          trusted partner in ensuring the well-being of your furry family
          members. Our dedicated team in Malolos strives to deliver unparalleled
          veterinary care with compassion and expertise.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-8">
          At PetLandia Vets, we aim to create a safe, nurturing space where pets
          receive top-tier medical care, and their owners find clarity and
          confidence in every step of their pet’s health journey.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-start gap-6">
          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-black mb-2">
              Compassion
            </h3>
            <p className="text-gray-800">
              We treat every pet as if they were part of our own family,
              ensuring love and care at every step.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-black mb-2">
              Professionalism
            </h3>
            <p className="text-gray-800">
              We uphold the highest standards of veterinary care, ensuring trust
              and reliability for every service.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-black mb-2">
              Innovation
            </h3>
            <p className="text-gray-800">
              By embracing cutting-edge technology, we deliver efficient and
              precise care tailored to every pet’s needs.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-8 text-center">
          Combining advanced veterinary technology with a personal touch, we
          offer a full spectrum of services, from wellness check-ups to
          emergency treatments. Trust PetLandia Vets for all your pet care
          needs.
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src="src/assets/dogs2.jpg"
            alt="About Us"
            className="rounded-lg shadow-xl w-full md:w-3/4"
          />
        </div>
      </div>
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

export default AboutDetails;
