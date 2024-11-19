import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddAdminModal = ({
  open,
  onClose,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  contactNo,
  setContactNo,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  confirmPassword,
  setConfirmPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onAddAdmin,
}) => {
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-[32rem]">
          <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="Contact Number"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
                  onClick={handleConfirmPasswordToggle}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={onAddAdmin}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddAdminModal;
