import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.png";
import Login from "../components/AuthComponents/Login";
import Signup from "../components/AuthComponents/Signup";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex justify-center items-center bg-pink-200">
        {isLogin ? (
          <Login onSwitch={() => setIsLogin(false)} />
        ) : (
          <Signup onSwitch={() => setIsLogin(true)} />
        )}
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
        <img src={placeholderImage} alt="Logo" className="h-40 w-40 mb-4" />
      </div>
    </div>
  );
};

export default LoginPage;
