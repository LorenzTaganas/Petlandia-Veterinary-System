import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";

const AboutDetails = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div class="mt-16 w-full h-24 bg-blue-500 flex items-center justify-center">
        <h1 className="font-paytone text-3xl font-bold text-white text-center text-shadow-[0_0_1px_#000000,0_0_2px_#000000,0_0_10px_#000000]">
          ABOUT US
        </h1>
      </div>

      <section className="flex flex-col items-center p-8 bg-gradient-to-t from-indigo-100 to-indigo-20">
        <section className="h-[calc(100vh-64px)] flex flex-col md:flex-row items-center justify-between px-6 py-8">
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 marker:rounded-full ">
            <div className="w-[30rem] h-[30rem] bg-blue-500 rounded-full overflow-hidden ">
              <img
                src="src/assets/dogs2.jpg"
                alt="PetLandia Vets"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="ml-[10rem] w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D]  md:text-4xl text-shadow-md mb-4">
              WE ARE PETLANDIA!
            </h1>

            <p className="text-lg font-txt text-gray-800 leading-relaxed mb-8 max-w-lg">
              Welcome to <span className="font-semibold">PetLandia Vets</span>,
              your trusted partner in ensuring the well-being of your furry
              family members. Our dedicated team in Malolos strives to deliver
              unparalleled veterinary care with compassion and expertise.
            </p>

            <h1 className="mt-24 font-paytone text-2xl font-bold text-[#3E3D3D] md:text-4xl text-shadow-md mb-4">
              OUR MISSION
            </h1>

            <p className="text-lg text-gray-800 font-txt leading-relaxed mb-8 max-w-lg">
              We aim to provide the highest standard of care to every pet that
              walks through our door. With compassion, expertise, and a personal
              touch, we ensure your pet's well-being in every stage of life.
            </p>
          </div>
        </section>
        <section className=" h-[calc(100vh-64px)] flex flex-col md:flex-row items-center justify-between px-6 py-8">
          <div className="w-1/2 mt-[-15rem]">
            <h1 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-shadow-md"></h1>

            <h1 className="p-0 max-w-lg mt-4 font-paytone text-48 font-bold text-[#3E3D3D] text-shadow-md">
              WHY CHOOSE US?
            </h1>

            <p className="text-[#616161] text-lg font-txt mt-4 max-w-md transition duration-500 ease-in-out transform hover:scale-105 hover:text-black-1000">
              Our clinic offers a comprehensive range of veterinary services to
              ensure your pet's health and well-being. Our team is committed to
              providing the highest standard of care with a personalized
              approach for every pet..
            </p>

            <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-xl">
              <Link to="/services-details">Our Services</Link>
            </button>
          </div>
          <div className="ml-[10rem] w-full md:w-1/2 flex justify-center">
            <div className="w-[30rem] h-[30rem] bg-blue-500 rounded-full overflow-hidden">
              <img
                src="src/assets/whychooseme.jpg"
                alt="Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="h-[calc(80vh-64px)]  flex flex-col items-center justify-center px-6 py-8">
          <h2 className="font-paytone text-2xl font-bold text-[#3E3D3D] text-48 text-shadow-md text-center mb-6">
            Our Core Values
          </h2>

          <div className="flex flex-wrap justify-center gap-8 mt-12 h-[20rem]">
            <div className=" flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/4">
              <h3 className="font-paytone text-[30px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                Compassion
              </h3>
              <p className="text-gray-800 text-lg font-txt mt-4 text-center">
                We treat every pet as if they were part of our own family,
                ensuring love and care at every step.
              </p>
            </div>
            <div className=" flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/4">
              <h3 className="font-paytone text-[30px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                Professionalism
              </h3>
              <p className="text-gray-800 text-lg font-txt mt-4 text-center">
                We uphold the highest standards of veterinary care, ensuring
                trust and reliability for every service.
              </p>
            </div>
            <div className=" flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/4">
              <h3 className="font-paytone text-[30px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                Innovation
              </h3>
              <p className="text-gray-800 text-lg font-txt mt-4 text-center">
                By embracing cutting-edge technology, we deliver efficient and
                precise care tailored to every pet’s needs.
              </p>
            </div>
          </div>
        </section>
      </section>
      <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
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
    </div>
  );
};

export default AboutDetails;
