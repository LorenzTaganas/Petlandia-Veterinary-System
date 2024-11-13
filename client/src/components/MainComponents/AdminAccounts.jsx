import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { getFullName } from "../../services/userService";
import { IconButton, Tooltip } from "@mui/material";
import {
  VisibilityOff,
  Visibility,
  Edit,
  Check,
  Clear,
  Add,
  Lock,
} from "@mui/icons-material";

const AdminAccounts = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAddAdminModal, setOpenAddAdminModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    const response = await axiosInstance.get("/users/role/Admin");
    setAdmins(response.data);
    setLoading(false);
  };

  const handleToggleUserStatus = async (id, isActive) => {
    try {
      await axiosInstance.put("/admin/account-status", {
        id,
        isActive,
      });
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleEditUser = (admin) => {
    setSelectedAdmin({ ...admin });
    setOpenEditModal(true);
  };

  const handleSaveUser = async () => {
    if (!selectedAdmin) return;
    try {
      await axiosInstance.put("/admin/update-account", {
        id: selectedAdmin.id,
        firstName: selectedAdmin.firstName,
        lastName: selectedAdmin.lastName,
        email: selectedAdmin.email,
        contactNo: selectedAdmin.contactNo,
      });
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === selectedAdmin.id ? { ...selectedAdmin } : admin
        )
      );
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await axiosInstance.put("/admin/account-password", {
          id: selectedAdmin.id,
          newPassword,
        });
        if (response.status === 200) {
          setOpenPasswordModal(false);
          setNewPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error("Error changing password:", error);
      }
    } else {
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenPasswordModal(false);
    setOpenAddAdminModal(false);
    setNewPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
    setPassword("");
  };

  const handleOpenPasswordModal = (admin) => {
    setSelectedAdmin(admin);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAddAdmin = async () => {
    try {
      await axiosInstance.post("/admin/create-admin", {
        firstName,
        lastName,
        email,
        contactNo,
        password,
      });
      setOpenAddAdminModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      fetchAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin Accounts</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setOpenAddAdminModal(true)}
        >
          <Add className="mr-2" />
          Add Admin
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin">Loading...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-blue-500 text-white rounded-lg shadow-md">
                <th className="px-4 py-3 rounded-l-lg">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Contact No</th>
                <th className="px-4 py-3 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } shadow-md`}
                >
                  <td className="px-4 py-3 text-center rounded-l-lg">
                    {getFullName(admin)}
                  </td>
                  <td className="px-4 py-3 text-center">{admin.email}</td>
                  <td className="px-4 py-3 text-center">{admin.contactNo}</td>
                  <td className="px-2 py-3 text-center rounded-r-lg">
                    <div className="flex justify-center gap-1.5">
                      <Tooltip title="Edit User">
                        <IconButton onClick={() => handleEditUser(admin)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Change Password">
                        <IconButton
                          onClick={() => handleOpenPasswordModal(admin)}
                        >
                          <Lock />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={admin.isActive ? "Disable User" : "Enable User"}
                      >
                        <IconButton
                          onClick={() =>
                            handleToggleUserStatus(admin.id, admin.isActive)
                          }
                          style={{
                            backgroundColor: admin.isActive ? "green" : "red",
                            borderRadius: "50%",
                            color: "white",
                            padding: "4px",
                            width: "1.8rem",
                            height: "1.8rem",
                            marginTop: "0.3rem",
                            marginInline: "0.5rem",
                          }}
                        >
                          {admin.isActive ? <Check /> : <Clear />}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[32rem]">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border rounded"
                  value={selectedAdmin?.firstName || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border rounded"
                  value={selectedAdmin?.lastName || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full mb-4 p-2 border rounded"
                  value={selectedAdmin?.email || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Contact Number *
                </label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border rounded"
                  value={selectedAdmin?.contactNo || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      contactNo: e.target.value,
                    })
                  }
                  placeholder="Contact Number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSaveUser}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                New Password *
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
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password *
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openAddAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[32rem]">
            <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  First Name *
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
                  Last Name *
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
                  Email *
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
                  Contact Number *
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
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full mb-4 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <div
                    className="absolute top-1/3 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full mb-4 p-2 border rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                  <div
                    className="absolute top-1/3 right-3 transform -translate-y-1/2 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddAdmin}
              >
                Add Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccounts;
