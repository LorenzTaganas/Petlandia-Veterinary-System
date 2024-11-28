import React from "react";

const ServicesDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-indigo-300 flex flex-col items-center">
      <div className="max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          At PetLandia Vets, we are committed to providing top-notch care for
          your furry friends. Our comprehensive range of services is designed to
          address all aspects of your pet's health and well-being, ensuring they
          live a happy and healthy life.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
          Services We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              General Check-Ups
            </h3>
            <p className="text-gray-600 text-center">
              Routine wellness exams to keep your pet in top health and catch
              potential issues early.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Grooming</h3>
            <p className="text-gray-600 text-center">
              Maintain your pet’s appearance and hygiene with our professional
              grooming services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Treatment</h3>
            <p className="text-gray-600 mb-4">
              Ensure your pet’s health with our specialized treatment services.
              From vaccinations to chronic disease management, we provide
              comprehensive care.
            </p>

            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Our Treatments Include:
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Vaccinations</li>
              <li>Emergency Care</li>
              <li>Chronic Disease Management</li>
              <li>Surgical Services</li>
              <li>Dental Care</li>
              <li>Parasite Control</li>
              <li>Rehabilitation and Physical Therapy</li>
              <li>Laboratory Services</li>
              <li>Behavioral Therapy</li>
              <li>Nutritional Counseling</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <img
            src="src/assets/dogs3.jpg"
            alt="Our Services"
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-center text-gray-600 mt-6">
          For more information or to schedule an appointment, feel free to
          contact us. We're here to ensure your pet receives the best care
          possible.
        </p>
      </div>
      <footer className="bg-gray-600 text-white py-4 mt-8 w-full">
        <div className="container mx-auto text-center">
          <p className="text-md">
            &copy; {new Date().getFullYear()} Petlandia Veterinary. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesDetails;
