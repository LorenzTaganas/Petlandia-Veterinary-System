import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { getFullName } from "../../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        const profileData = response.data;
        setUser(profileData);
        setUpdatedUser({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          contactNo: profileData.contactNo,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (
      updatedUser.firstName &&
      updatedUser.lastName &&
      updatedUser.email &&
      updatedUser.contactNo
    ) {
      try {
        await axiosInstance.put("/update-profile", updatedUser);
        setUser({ ...updatedUser, role: user.role });
        setEditable(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      alert("All fields must be filled.");
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="bg-white shadow-md p-8 w-full max-w-4xl rounded-lg">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {user
                ? (
                    user.firstName.charAt(0) + user.lastName.charAt(0)
                  ).toUpperCase()
                : "U"}
            </span>
          </div>
          <div className="ml-8 flex-grow">
            <h2 className="text-3xl font-semibold">{getFullName(user)}</h2>
            <p className="text-gray-500">{user ? user.role : "Loading..."}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleChange}
              disabled={!editable}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleChange}
              disabled={!editable}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              disabled={!editable}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Contact No.
            </label>
            <input
              type="text"
              name="contactNo"
              value={updatedUser.contactNo}
              onChange={handleChange}
              disabled={!editable}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {editable ? (
            <button
              onClick={handleEditClick}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-4"
            >
              Cancel
            </button>
          ) : null}
          <button
            onClick={editable ? handleSave : handleEditClick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editable ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
