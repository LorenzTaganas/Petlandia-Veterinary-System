import axiosInstance from "./axiosInstance";

export const updateAccount = async (selectedAdmin) => {
  await axiosInstance.put("/admin/update-account", {
    id: selectedAdmin.id,
    firstName: selectedAdmin.firstName,
    lastName: selectedAdmin.lastName,
    email: selectedAdmin.email,
    contactNo: selectedAdmin.contactNo,
  });
};

export const toggleAccountStatus = async (id, isActive) => {
  await axiosInstance.put("/admin/account-status", {
    id,
    isActive,
  });
};

export const changeAccountPassword = async (id, newPassword) => {
  await axiosInstance.put("/admin/account-password", {
    id,
    newPassword,
  });
};

export const getAdmins = async () => {
  const response = await axiosInstance.get("/users/role/Admin");
  return response.data;
};

export const addAdminAccount = async (
  firstName,
  lastName,
  email,
  contactNo,
  password
) => {
  await axiosInstance.post("/admin/create-admin", {
    firstName,
    lastName,
    email,
    contactNo,
    password,
  });
};

export const getClients = async () => {
  const response = await axiosInstance.get("/users/role/Client");
  return response.data;
};

export const addClientAccount = async (
  firstName,
  lastName,
  email,
  contactNo,
  password
) => {
  await axiosInstance.post("/admin/create-client", {
    firstName,
    lastName,
    email,
    contactNo,
    password,
  });
};

export const getStaffs = async () => {
  const response = await axiosInstance.get("/users/role/Staff");
  return response.data;
};

export const addStaffAccount = async (
  firstName,
  lastName,
  email,
  contactNo,
  password
) => {
  await axiosInstance.post("/admin/create-staff", {
    firstName,
    lastName,
    email,
    contactNo,
    password,
  });
};

export const getAllUsersExceptSelf = async () => {
  const response = await axiosInstance.get("/admin/account/exclude-self");
  return response.data;
};

export const createUserWithRole = async (
  firstName,
  lastName,
  email,
  contactNo,
  password,
  role
) => {
  await axiosInstance.post("/admin/account/create", {
    firstName,
    lastName,
    email,
    contactNo,
    password,
    role,
  });
};

export const updateUserWithRole = async (
  id,
  firstName,
  lastName,
  email,
  contactNo,
  role,
  isActive
) => {
  await axiosInstance.put("/admin/account/update", {
    id,
    firstName,
    lastName,
    email,
    contactNo,
    role,
    isActive,
  });
};
