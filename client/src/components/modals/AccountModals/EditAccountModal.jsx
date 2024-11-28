import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Check, Clear } from "@mui/icons-material";

const EditAccountModal = ({ open, onClose, selectedUser, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
      setContactNo(selectedUser.contactNo);
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSave = () => {
    const updatedUser = {
      id: selectedUser.id,
      firstName,
      lastName,
      email,
      contactNo,
      role,
    };
    onSave(updatedUser);
  };

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-[32rem]">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
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

          {/* Role dropdown (full width) */}
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select one...
              </option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Client">Client</option>
            </select>
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditAccountModal;
