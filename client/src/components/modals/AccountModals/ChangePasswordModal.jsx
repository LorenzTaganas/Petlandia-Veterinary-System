import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ChangePasswordModal = ({
  open,
  onClose,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onSave,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const errors = {};

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

  const handleSave = async () => {
    if (validateForm()) {
      try {
        await onSave();
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  return (
    open && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`w-full p-2 border ${
                    formErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setFormErrors((prev) => ({ ...prev, newPassword: "" }));
                  }}
                  placeholder="New Password"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full p-2 border ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="Confirm Password"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
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
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <Dialog open={isSuccessModalOpen} onClose={handleModalClose}>
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
            <Button onClick={handleModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

export default ChangePasswordModal;
