import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ContactDetails = () => {

const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const token = Cookies.get("accessToken");
  setIsAuthenticated(!!token);

}, []);
  return (

    <div className="min-h-screen flex flex-col">

        <div class="mt-16 w-full h-24 bg-blue-500 flex items-center justify-center">
            <h1 className="font-paytone text-3xl font-bold text-white text-center">
                CONTACT US
            </h1>
        </div>
        
        <section className=" h-[calc(120vh-64px)] bg-gradient-to-t from-indigo-100 to-indigo-10 flex flex-col items-center ">
          <h1 className="flex font-paytone text-48 font-bold text-[#3E3D3D] mb-6 mt-20">
              We look forward to seeing you!
          </h1>
          <p className="text-[#616161] font-txt max-w-2xl text-center">
            PetLandia is always here to help with your pet care needs.
           Whether you have questions about our services or want to schedule an appointment, 
           feel free to reach out to us through any of the following options
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
              <h4 className="mt-10 text-black font-semibold text-[30px] mb-4">Address</h4>

              <div className="text-black text-center">
                <p>
                   Sapphire Street<br />
                   Capitol View Park Subdivision<br />
                   Malolos, Philippines
                </p>
              </div>
            </div>
            
            <div className="bg-transparent w-1/2 h flex flex-col justify-center items-center text-white rounded-lg p-4 ">
              <div className="mt-6 w-28 h-28  p-6 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  src="src/assets/time.png"
                  alt="Services"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className=" mt-10 text-black font-semibold text-[30px] mb-4">Hours</h4>

              <div className="text-black text-center">
                <p>
                  <b>Mon-Sat:</b> 9:00 AM - 6:00 PM<br />
                  <b>Sunday:</b> 12:00 NN - 6:00 PM<br />
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
              <h4 className="mt-10 text-black font-semibold text-[30px] mb-4">Contact Info</h4>

              <div className="text-black text-center">
                <p>
                  <b>Call:</b> 0965-8063-229<br />
                  <b>Fax:</b> (044) 802 7334<br />
                  <b>Email:</b> petlandiavets@gmail.com
                </p>
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

export default ContactDetails;
