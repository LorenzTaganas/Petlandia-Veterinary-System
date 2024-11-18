import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const handlePasswordToggle = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    open && (
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
                className="w-full p-2 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
                onClick={() => handlePasswordToggle()}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>
          <div className="mb-4">
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
                onClick={() => handleConfirmPasswordToggle()}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChangePasswordModal;
