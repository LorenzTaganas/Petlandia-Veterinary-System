import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await axiosInstance.put("/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Password change failed.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="p-8 bg-white shadow-md w-96"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-3xl text-center font-semibold mb-4">
          Change Password
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Current Password*
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            New Password*
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Confirm New Password*
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
        >
          Change Password
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
