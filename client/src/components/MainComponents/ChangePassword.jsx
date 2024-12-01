import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!currentPassword.trim())
      errors.currentPassword = "Current Password is required";

    if (!newPassword.trim()) {
      errors.newPassword = "New Password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    if (validateForm()) {
      try {
        const response = await axiosInstance.put("/change-password", {
          currentPassword,
          newPassword,
          confirmPassword,
        });
        setMessage(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsSuccessModalOpen(true);
      } catch (error) {
        setMessage(error.response?.data?.message || "Password change failed.");
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
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
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, currentPassword: "" }));
              }}
              placeholder="Current Password"
              className={`w-full px-4 py-2 border ${
                formErrors.currentPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
          {formErrors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.currentPassword}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
              placeholder="New Password"
              className={`w-full px-4 py-2 border ${
                formErrors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
          {formErrors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.newPassword}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              placeholder="Confirm New Password"
              className={`w-full px-4 py-2 border ${
                formErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4"
        >
          Change Password
        </button>
        {message && <p className="text-red-500 text-center">{message}</p>}

        <Dialog open={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
          <DialogTitle
            sx={{
              color: "success.main",
            }}
          >
            Success
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Password changed successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ChangePassword;
