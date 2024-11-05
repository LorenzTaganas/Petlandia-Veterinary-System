import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return {
      ...response.data,
      isAdmin: response.data.role === "Admin",
      isDoctor: response.data.role === "Doctor",
      isClient: response.data.role === "Client",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getFullName = (user) => {
  if (user && user.firstName && user.lastName) {
    const fullName = `${user.firstName} ${user.lastName}`;
    return toTitleCase(fullName);
  }
  return "";
};

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
