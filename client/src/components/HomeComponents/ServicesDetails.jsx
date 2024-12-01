import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ServicesDetails = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div class="mt-16 w-full h-24 bg-blue-500 flex items-center justify-center">
        <h1 className="font-paytone text-3xl font-bold text-white text-center text-shadow-[0_0_1px_#000000,0_0_2px_#000000,0_0_10px_#000000]">
          SERVICES
        </h1>
      </div>

      <section className="flex flex-col items-center  ">
        <div className="flex w-full text-center ">
          <div className="bg-gradient-to-t from-indigo-100 to-indigo-20 p-6 whitespace-normal flex-grow">
            <div className="flex flex-wrap justify-center gap-8 mt-8 h-[23rem] mb-[8rem]">
              <div className="bg-white p-6 rounded-[20px] w-[520px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up">
                <div className="p-6 w-full h-60 mb-4 rounded-[20px] overflow-hidden flex justify-center items-center">
                  <img
                    src="src/assets/kyut.png"
                    alt="General Check-Ups"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-paytone text-[2rem] font-bold text-[#3E3D3D] text-shadow-md">
                  General Check-Ups
                </h1>
                <p className="text-gray-600 text-justify font-txt mt-4 ml-[12px] max-w-md">
                  Combining advanced veterinary technology with a personal
                  touch, we offer a full spectrum of services, from wellness
                  check-ups to emergency treatments. Trust PetLandia Vets for
                  all your pet care needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[20px] w-[520px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up">
                <div className="w-full h-60 mb-4 rounded-[20px] overflow-hidden flex justify-center items-center">
                  <img
                    src="src/assets/ligo.png"
                    alt="Grooming"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-paytone text-[2rem] font-bold text-[#3E3D3D] text-shadow-md">
                  Grooming
                </h1>
                <p className="text-gray-600 text-justify font-txt mt-4 ml-[12px] max-w-md">
                  Combining advanced veterinary technology with a personal
                  touch, we offer a full spectrum of services, from wellness
                  check-ups to emergency treatments. Trust PetLandia Vets for
                  all your pet care needs.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="font-paytone text-[2rem] font-bold text-[#3E3D3D] text-shadow-md">
                Treatments
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-8 h-[23rem] ">
              <div className=" flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/ecare.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Emergency Care
                </h1>
                <p className="text-gray-800 font-txt mt-10">
                  Immediate treatment for serious injuries or illnesses
                </p>
              </div>

              <div className="flex flex-col items-center  bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6 ">
                <div className="w-28 h-28 p-3 rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/lab.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Laboratory Services
                </h1>
                <p className="text-gray-800 font-txt ">
                  Tests to diagnose medical conditions
                </p>
              </div>

              <div className="flex flex-col items-center  bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6 ">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/vacc.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Vaccination
                </h1>
                <p className="text-gray-800 font-txt mt-10">
                  Protects pets from contagious diseases
                </p>
              </div>

              <div className="flex flex-col items-center  bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6 ">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/antirab.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Anti-rabies Vaccination
                </h1>
                <p className="text-gray-800 font-txt">
                  Vaccine to prevent rabies
                </p>
              </div>
            </div>

            <div className="mt-8" />

            <div className="flex flex-wrap justify-center gap-8 mt-8 h-[23rem] mb-20">
              <div className="flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6 ">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/deworm.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Deworming
                </h1>
                <p className="text-gray-800 font-txt mt-10">
                  Eliminates intestinal parasites
                </p>
              </div>

              <div className="flex flex-col items-center  bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6 ">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/confine.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Confinement
                </h1>
                <p className="text-gray-800 font-txt mt-10">
                  Post-surgery or illness care and monitoring
                </p>
              </div>

              <div className="flex flex-col items-center  bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/xray.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Diagnostic <br></br> X-ray
                </h1>
                <p className="text-gray-800 font-txt">
                  Imaging to detect internal issues or fractures
                </p>
              </div>

              <div className="flex flex-col items-center bg-white p-6 rounded-[20px] shadow-now transition-transform duration-300 transform hover:scale-105 hover:shadow-up w-1/6">
                <div className="w-28 h-28 p-3  rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src="src/assets/hcall.png"
                    alt="Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="font-paytone text-[24px] font-bold text-[#3E3D3D] text-shadow-md mt-4">
                  Housecall Services
                </h1>
                <p className="text-gray-800 font-txt">
                  Veterinary care at your pet's home
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 w-full">
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

export default ServicesDetails;
