import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../../services/axiosInstance";

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      Cookies.set("accessToken", accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
        path: "/",
      });
      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div
      className="text-center p-8 bg-white shadow-md"
      style={{ width: "90%", height: "90%" }}
    >
      <h2 className="text-3xl font-semibold mb-4">Sign In to Your Account</h2>
      <p className="text-gray-700 mb-6">Hi, Welcome to Petlandia!</p>
      <div className="text-left mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="text-left mb-6">
        <label className="block text-gray-700 font-medium mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleClickShowPassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </button>
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Login
      </button>
      {message && <p className="text-red-500">{message}</p>}
      <p className="mt-4">
        New to Petlandia?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={onSwitch}>
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Login;
