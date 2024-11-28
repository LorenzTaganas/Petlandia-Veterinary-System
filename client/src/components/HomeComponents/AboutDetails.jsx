import React from "react";

const AboutDetails = () => {
  const currentYear = new Date().getFullYear(); // Moved the year calculation here

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-indigo-300 flex flex-col items-center">
      <div className="max-w-5xl bg-white shadow-xl rounded-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed text-center mb-8">
          Welcome to <span className="font-semibold">PetLandia Vets</span>, your
          trusted partner in ensuring the well-being of your furry family
          members. Our dedicated team in Malolos strives to deliver unparalleled
          veterinary care with compassion and expertise.
        </p>

        {/* Mission Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-8">
          At PetLandia Vets, we aim to create a safe, nurturing space where pets
          receive top-tier medical care, and their owners find clarity and
          confidence in every step of their pet’s health journey.
        </p>

        {/* Core Values Section */}
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

        {/* Why Choose Us Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-8 text-center">
          Combining advanced veterinary technology with a personal touch, we
          offer a full spectrum of services, from wellness check-ups to
          emergency treatments. Trust PetLandia Vets for all your pet care
          needs.
        </p>

        {/* Image Section */}
        <div className="mt-8 flex justify-center">
          <img
            src="src/assets/dogs2.jpg"
            alt="About Us"
            className="rounded-lg shadow-xl w-full md:w-3/4"
          />
        </div>
      </div>
      <footer className="bg-gray-600 text-white py-4 mt-8 w-full">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-md">
            &copy; {currentYear} PetLandia Veterinary. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutDetails;
