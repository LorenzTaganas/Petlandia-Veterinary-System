import React, { useEffect, useState } from "react";
import { getFullName } from "../../services/userService";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Check, Clear, Add, Lock } from "@mui/icons-material";
import {
  updateAccount,
  toggleAccountStatus,
  changeAccountPassword,
  getClients,
  addClientAccount,
} from "../../services/accountService";
import AddClientModal from "../modals/AddClientModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import EditClientModal from "../modals/EditClientModal";

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
    const data = await getClients();
    setClients(data);
    setLoading(false);
  };

  const handleToggleAccountStatus = async (id, isActive) => {
    try {
      await toggleAccountStatus(id, isActive);
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === id ? { ...client, isActive: !client.isActive } : client
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleUpdateAccount = async () => {
    if (!selectedClient) return;
    try {
      await updateAccount(selectedClient);
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

  const handleChangeAccountPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await changeAccountPassword(selectedClient.id, newPassword);
        setOpenPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleAddClientAccount = async () => {
    try {
      await addClientAccount(firstName, lastName, email, contactNo, password);
      setOpenAddClientModal(false);
      fetchClients();
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleEditUser = (client) => {
    setSelectedClient({ ...client });
    setOpenEditModal(true);
  };

  const handleOpenPasswordModal = (client) => {
    setSelectedClient(client);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenPasswordModal(false);
    setOpenAddClientModal(false);
    setNewPassword("");
    setConfirmPassword("");
    setPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
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
              {clients.length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                clients.map((client, index) => (
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
                    <td className="px-4 py-3 text-center">
                      {client.contactNo}
                    </td>
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
                          title={
                            client.isActive ? "Disable User" : "Enable User"
                          }
                        >
                          <IconButton
                            onClick={() =>
                              handleToggleAccountStatus(
                                client.id,
                                client.isActive
                              )
                            }
                            style={{
                              backgroundColor: client.isActive
                                ? "green"
                                : "red",
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <EditClientModal
        open={openEditModal}
        onClose={handleCloseModal}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        onSave={handleUpdateAccount}
      />

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={handleCloseModal}
        selectedClient={selectedClient}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        onSave={handleChangeAccountPassword}
      />

      <AddClientModal
        open={openAddClientModal}
        onClose={handleCloseModal}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        contactNo={contactNo}
        setContactNo={setContactNo}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        confirmPassword={confirmPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        setConfirmPassword={setConfirmPassword}
        onAddClient={handleAddClientAccount}
      />
    </div>
  );
};

export default ClientAccounts;
