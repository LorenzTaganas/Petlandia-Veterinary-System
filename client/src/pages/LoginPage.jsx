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

      <div className="w-1/2 flex flex-col justify-center items-center bg-blue-200">
        <img
          src="src/assets/dogs.jpg"
          alt="Logo"
          className="h-200 w-200 mb-4"
        />
      </div>
    </div>
  );
};

export default LoginPage;
