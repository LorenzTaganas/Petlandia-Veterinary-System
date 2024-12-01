import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EditAccountModal = ({ open, onClose, selectedUser, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
      setContactNo(selectedUser.contactNo);
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

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

    if (!role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmSave = () => {
    const updatedUser = {
      id: selectedUser.id,
      firstName,
      lastName,
      email,
      contactNo,
      role,
    };
    onSave(updatedUser);
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  return (
    open && (
      <>
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
                  className={`w-full mb-4 p-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm -mt-3 mb-2">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full mb-4 p-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm -mt-3 mb-2">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full mb-4 p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm -mt-3 mb-2">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full mb-4 p-2 border ${
                    errors.contactNo ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="Contact Number"
                />
                {errors.contactNo && (
                  <p className="text-red-500 text-sm -mt-3 mb-2">
                    {errors.contactNo}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full p-2 border ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } rounded`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select One...
                </option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Client">Client</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
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
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {isConfirmModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Confirm Edit User</h2>
              <p className="mb-6">
                Are you sure you want to save these changes?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                User Updated Successfully!
              </h2>
              <p className="mb-6">
                The user details have been updated in the system.
              </p>
              <button
                onClick={handleSuccessModalClose}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default EditAccountModal;
