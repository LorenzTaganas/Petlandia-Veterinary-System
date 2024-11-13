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

const ClientAccounts = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
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
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const response = await axiosInstance.get("/users/role/Client");
    setClients(response.data);
    setLoading(false);
  };

  const handleToggleUserStatus = async (id, isActive) => {
    try {
      await axiosInstance.put("/admin/account-status", {
        id,
        isActive,
      });
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === id ? { ...client, isActive: !client.isActive } : client
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleEditUser = (client) => {
    setSelectedClient({ ...client });
    setOpenEditModal(true);
  };

  const handleSaveUser = async () => {
    if (!selectedClient) return;
    try {
      await axiosInstance.put("/admin/update-account", {
        id: selectedClient.id,
        firstName: selectedClient.firstName,
        lastName: selectedClient.lastName,
        email: selectedClient.email,
        contactNo: selectedClient.contactNo,
      });
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === selectedClient.id ? { ...selectedClient } : client
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
          id: selectedClient.id,
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
    setOpenAddClientModal(false);
    setNewPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
    setPassword("");
  };

  const handleOpenPasswordModal = (client) => {
    setSelectedClient(client);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAddClient = async () => {
    try {
      await axiosInstance.post("/admin/create-client", {
        firstName,
        lastName,
        email,
        contactNo,
        password,
      });
      setOpenAddClientModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Client Accounts</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setOpenAddClientModal(true)}
        >
          <Add className="mr-2" />
          Add Client
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
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } shadow-md`}
                >
                  <td className="px-4 py-3 text-center rounded-l-lg">
                    {getFullName(client)}
                  </td>
                  <td className="px-4 py-3 text-center">{client.email}</td>
                  <td className="px-4 py-3 text-center">{client.contactNo}</td>
                  <td className="px-2 py-3 text-center rounded-r-lg">
                    <div className="flex justify-center gap-1.5">
                      <Tooltip title="Edit User">
                        <IconButton onClick={() => handleEditUser(client)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Change Password">
                        <IconButton
                          onClick={() => handleOpenPasswordModal(client)}
                        >
                          <Lock />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={client.isActive ? "Disable User" : "Enable User"}
                      >
                        <IconButton
                          onClick={() =>
                            handleToggleUserStatus(client.id, client.isActive)
                          }
                          style={{
                            backgroundColor: client.isActive ? "green" : "red",
                            borderRadius: "50%",
                            color: "white",
                            padding: "4px",
                            width: "1.8rem",
                            height: "1.8rem",
                            marginTop: "0.3rem",
                            marginInline: "0.5rem",
                          }}
                        >
                          {client.isActive ? <Check /> : <Clear />}
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
                  value={selectedClient?.firstName || ""}
                  onChange={(e) =>
                    setSelectedClient({
                      ...selectedClient,
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
                  value={selectedClient?.lastName || ""}
                  onChange={(e) =>
                    setSelectedClient({
                      ...selectedClient,
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
                  value={selectedClient?.email || ""}
                  onChange={(e) =>
                    setSelectedClient({
                      ...selectedClient,
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
                  value={selectedClient?.contactNo || ""}
                  onChange={(e) =>
                    setSelectedClient({
                      ...selectedClient,
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

      {openAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[32rem]">
            <h2 className="text-xl font-semibold mb-4">Add Client</h2>
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
                onClick={handleAddClient}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAccounts;
