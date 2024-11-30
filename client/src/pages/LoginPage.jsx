import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.png";
import Login from "../components/AuthComponents/Login";
import Signup from "../components/AuthComponents/Signup";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-indigo-300 to-indigo-100">
        {isLogin ? (
          <Login onSwitch={() => setIsLogin(false)} />
        ) : (
          <Signup onSwitch={() => setIsLogin(true)} />
        )}
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <img
          src="src/assets/LGGO (2).png"
          alt="Logo"
          className="h-20 w-auto m-3"
        />
        <img
          src="src/assets/dogs-removebg-preview.png"
          alt="Logo"
          className="h-200 w-200 mb-4"
        />
      </div>
    </div>
  );
};

export default LoginPage;
