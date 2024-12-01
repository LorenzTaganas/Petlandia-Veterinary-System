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
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First Name must contain only letters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last Name must contain only letters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must include @ symbol";
    }

    if (!contactNo.trim()) {
      newErrors.contactNo = "Contact Number is required";
    } else if (!/^\d{11}$/.test(contactNo)) {
      newErrors.contactNo = "Contact Number must be 11 digits";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/signup", {
          firstName,
          lastName,
          email,
          contactNo,
          password,
        });
        setIsSuccessModalOpen(true);
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || "Signup failed.",
        });
      }
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    onSwitch();
  };

  return (
    <div
      className="text-center p-12 bg-white shadow-lg rounded-md"
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
            className={`w-full px-4 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
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
            className={`w-full px-4 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
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
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
            className={`w-full px-4 py-2 border ${
              errors.contactNo ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
          />
          {errors.contactNo && (
            <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
          )}
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
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
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
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Sign Up
      </button>
      {errors.submit && <p className="text-red-500 mb-4">{errors.submit}</p>}
      <p className="mt-4">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={onSwitch}>
          Login here
        </span>
      </p>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Signup Successful!
            </h2>
            <p className="mb-6">Your account has been created successfully.</p>
            <button
              onClick={handleSuccessModalClose}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
