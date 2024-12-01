import React, { useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getFullName } from "../../services/userService";
import {
  Edit,
  Check,
  Clear,
  Add,
  Lock,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import {
  updateUserWithRole,
  toggleAccountStatus,
  changeAccountPassword,
  getAllUsersExceptSelf,
  createUserWithRole,
} from "../../services/accountService";

import AddAccountModal from "../modals/AccountModals/AddAccountModal";
import EditAccountModal from "../modals/AccountModals/EditAccountModal";
import ChangePasswordModal from "../modals/AccountModals/ChangePasswordModal";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getAllUsersExceptSelf();
    setUsers(data);
    setLoading(false);
  };

  const filterAndSortUsers = () => {
    let filteredUsers = [...users];

    if (roleFilter !== "All") {
      filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
    }

    return filteredUsers.sort((a, b) => {
      const nameA = getFullName(a).toLowerCase();
      const nameB = getFullName(b).toLowerCase();

      let comparison = nameA.localeCompare(nameB);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handleToggleAccountStatus = async (id, isActive) => {
    try {
      await toggleAccountStatus(id, isActive);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (error) {
      console.error("Error toggling account status:", error);
    }
  };

  const handleUpdateAccount = async (updatedUser) => {
    try {
      await updateUserWithRole(
        updatedUser.id,
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.email,
        updatedUser.contactNo,
        updatedUser.role
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      fetchUsers();

      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChangeAccountPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await changeAccountPassword(selectedUser.id, newPassword);
        setOpenPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      await createUserWithRole(
        firstName,
        lastName,
        email,
        contactNo,
        password,
        role
      );
      setOpenAddUserModal(false);
      fetchUsers();
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setOpenEditModal(true);
  };

  const handleOpenPasswordModal = (user) => {
    setSelectedUser(user);
    setOpenPasswordModal(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenPasswordModal(false);
    setOpenAddUserModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 mb-4">
          <FormControl variant="outlined" size="small" className="w-40">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
          <Tooltip
            title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
          >
            <IconButton
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Tooltip>
          <FormControl variant="outlined" size="small" className="w-40">
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Client">Client</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setOpenAddUserModal(true)}
        >
          <Add className="mr-2" />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-blue-500 text-white rounded-lg shadow-md">
                <th className="px-4 py-3 rounded-l-lg">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Contact No</th>
                <th className="px-4 py-3 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterAndSortUsers().length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                filterAndSortUsers().map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-3 text-center">
                      {getFullName(user)}
                    </td>
                    <td className="px-4 py-3 text-center">{user.role}</td>
                    <td className="px-4 py-3 text-center">{user.email}</td>
                    <td className="px-4 py-3 text-center">{user.contactNo}</td>
                    <td className="px-2 py-3 text-center">
                      <div className="flex justify-center gap-1.5">
                        <Tooltip title="Edit User">
                          <IconButton onClick={() => handleEditUser(user)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Change Password">
                          <IconButton
                            onClick={() => handleOpenPasswordModal(user)}
                          >
                            <Lock />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          title={user.isActive ? "Disable User" : "Enable User"}
                        >
                          <IconButton
                            onClick={() =>
                              handleToggleAccountStatus(user.id, user.isActive)
                            }
                            style={{
                              backgroundColor: user.isActive ? "green" : "red",
                              color: "white",
                            }}
                          >
                            {user.isActive ? <Check /> : <Clear />}
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

      <EditAccountModal
        open={openEditModal}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        onSave={handleUpdateAccount}
      />

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSave={handleChangeAccountPassword}
      />

      <AddAccountModal
        open={openAddUserModal}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
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
        setConfirmPassword={setConfirmPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        role={role}
        setRole={setRole}
      />
    </div>
  );
};

export default AccountManagement;
