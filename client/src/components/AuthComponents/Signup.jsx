import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const Signup = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        contactNo,
        password,
      });
      setMessage(response.data.message);
      onSwitch();
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div
      className="text-center p-8 bg-white shadow-md"
      style={{ width: "90%", height: "90%" }}
    >
      <h2 className="text-3xl font-semibold mb-4">Create Your Account</h2>
      <p className="text-gray-700 mb-6">
        Please fill up the form to create your account
      </p>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-1/2 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 text-left">
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
        <div className="w-1/2 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            Contact No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="w-1/2 text-left">
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
        </div>
        <div className="w-1/2 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Sign Up
      </button>
      {message && <p className="text-red-500">{message}</p>}
      <p className="mt-4">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={onSwitch}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Signup;
