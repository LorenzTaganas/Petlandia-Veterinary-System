import React from "react";

const ContactDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-indigo-300 flex flex-col items-center px-6 py-12">
      <main className="flex-grow">
        <section className="bg-light-blue-50 text-gray-800 py-16 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-extrabold text-center mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-center mb-8">
              Have questions or need to schedule an appointment? We're here to
              assist you! Get in touch with us today.
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Contact Information
            </h2>
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
                <p className="text-lg text-gray-600">(+63) 123-456-7890</p>
              </div>
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-700">Email</h3>
                <p className="text-lg text-gray-600">
                  contact@petlandiavets.com
                </p>
              </div>
            </div>

            {/* Office Address */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Office Address
              </h3>
              <p className="text-lg text-gray-600">
                PetLandia Vets, Malolos, Bulacan, Philippines
              </p>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Business Hours
              </h3>
              <ul className="text-lg text-gray-600">
                <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 9:00 AM - 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 w-full">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} PetLandia Veterinary. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactDetails;
