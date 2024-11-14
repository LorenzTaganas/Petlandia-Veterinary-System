import React, { useEffect, useState } from "react";
import { getFullName } from "../../services/userService";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Check, Clear, Add, Lock } from "@mui/icons-material";
import {
  updateAccount,
  toggleAccountStatus,
  changeAccountPassword,
  getStaffs,
  addStaffAccount,
} from "../../services/accountService";
import AddStaffModal from "../modals/AddStaffModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import EditStaffModal from "../modals/EditStaffModal";

const StaffAccounts = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAddStaffModal, setOpenAddStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
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
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    setLoading(true);
    const data = await getStaffs();
    setStaffs(data);
    setLoading(false);
  };

  const handleToggleAccountStatus = async (id, isActive) => {
    try {
      await toggleAccountStatus(id, isActive);
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === id ? { ...staff, isActive: !staff.isActive } : staff
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleUpdateAccount = async () => {
    if (!selectedStaff) return;
    try {
      await updateAccount(selectedStaff);
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === selectedStaff.id ? { ...selectedStaff } : staff
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
        await changeAccountPassword(selectedStaff.id, newPassword);
        setOpenPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleAddStaffAccount = async () => {
    try {
      await addStaffAccount(firstName, lastName, email, contactNo, password);
      setOpenAddStaffModal(false);
      fetchStaffs();
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const handleEditUser = (staff) => {
    setSelectedStaff({ ...staff });
    setOpenEditModal(true);
  };

  const handleOpenPasswordModal = (staff) => {
    setSelectedStaff(staff);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenPasswordModal(false);
    setOpenAddStaffModal(false);
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
        <h2 className="text-2xl font-semibold">Staff Accounts</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setOpenAddStaffModal(true)}
        >
          <Add className="mr-2" />
          Add Staff
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
              {staffs.length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                staffs.map((staff, index) => (
                  <tr
                    key={staff.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } shadow-md`}
                  >
                    <td className="px-4 py-3 text-center rounded-l-lg">
                      {getFullName(staff)}
                    </td>
                    <td className="px-4 py-3 text-center">{staff.email}</td>
                    <td className="px-4 py-3 text-center">{staff.contactNo}</td>
                    <td className="px-2 py-3 text-center rounded-r-lg">
                      <div className="flex justify-center gap-1.5">
                        <Tooltip title="Edit User">
                          <IconButton onClick={() => handleEditUser(staff)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Change Password">
                          <IconButton
                            onClick={() => handleOpenPasswordModal(staff)}
                          >
                            <Lock />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          title={
                            staff.isActive ? "Disable User" : "Enable User"
                          }
                        >
                          <IconButton
                            onClick={() =>
                              handleToggleAccountStatus(
                                staff.id,
                                staff.isActive
                              )
                            }
                            style={{
                              backgroundColor: staff.isActive ? "green" : "red",
                              borderRadius: "50%",
                              color: "white",
                              padding: "4px",
                              width: "1.8rem",
                              height: "1.8rem",
                              marginTop: "0.3rem",
                              marginInline: "0.5rem",
                            }}
                          >
                            {staff.isActive ? <Check /> : <Clear />}
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

      <EditStaffModal
        open={openEditModal}
        onClose={handleCloseModal}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        onSave={handleUpdateAccount}
      />

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={handleCloseModal}
        selectedStaff={selectedStaff}
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

      <AddStaffModal
        open={openAddStaffModal}
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
        onAddStaff={handleAddStaffAccount}
      />
    </div>
  );
};

export default StaffAccounts;
