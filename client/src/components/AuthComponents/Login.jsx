import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../../services/axiosInstance";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required";
    if (!password.trim()) errors.password = "Password is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (validateForm()) {
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
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-12">
      <h2 className="text-3xl font-semibold pt-2 mb-4 text-center">
        Sign In to Your Account
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Hi, Welcome to Petlandia!
      </p>
      <div className="text-left mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormErrors((prev) => ({ ...prev, email: "" }));
          }}
          className={`w-full px-4 py-2 border ${
            formErrors.email ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:border-blue-500`}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
        <div className="text-left mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full px-4 py-2 border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={handleClickShowPassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mb-4"
        >
          Login
        </button>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <p className="mt-4 text-center">
          New to Petlandia?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
