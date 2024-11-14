import React, { useEffect, useState } from "react";
import { getFullName } from "../../services/userService";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Check, Clear, Add, Lock } from "@mui/icons-material";
import {
  updateAccount,
  toggleAccountStatus,
  changeAccountPassword,
  getAdmins,
  addAdminAccount,
} from "../../services/accountService";
import AddAdminModal from "../modals/AddAdminModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import EditAdminModal from "../modals/EditAdminModal";

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
    const data = await getAdmins();
    setAdmins(data);
    setLoading(false);
  };

  const handleToggleAccountStatus = async (id, isActive) => {
    try {
      await toggleAccountStatus(id, isActive);
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleUpdateAccount = async () => {
    if (!selectedAdmin) return;
    try {
      await updateAccount(selectedAdmin);
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

  const handleChangeAccountPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await changeAccountPassword(selectedAdmin.id, newPassword);
        setOpenPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleAddAdminAccount = async () => {
    try {
      await addAdminAccount(firstName, lastName, email, contactNo, password);
      setOpenAddAdminModal(false);
      fetchAdmins();
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleEditUser = (admin) => {
    setSelectedAdmin({ ...admin });
    setOpenEditModal(true);
  };

  const handleOpenPasswordModal = (admin) => {
    setSelectedAdmin(admin);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenPasswordModal(false);
    setOpenAddAdminModal(false);
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
              {admins.length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                admins.map((admin, index) => (
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
                          title={
                            admin.isActive ? "Disable User" : "Enable User"
                          }
                        >
                          <IconButton
                            onClick={() =>
                              handleToggleAccountStatus(
                                admin.id,
                                admin.isActive
                              )
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <EditAdminModal
        open={openEditModal}
        onClose={handleCloseModal}
        selectedAdmin={selectedAdmin}
        setSelectedAdmin={setSelectedAdmin}
        onSave={handleUpdateAccount}
      />

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={handleCloseModal}
        selectedAdmin={selectedAdmin}
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

      <AddAdminModal
        open={openAddAdminModal}
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
        onAddAdmin={handleAddAdminAccount}
      />
    </div>
  );
};

export default AdminAccounts;
