import axiosInstance from "./axiosInstance";

export const createHistory = async (data) => {
  try {
    const response = await axiosInstance.post("/history/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllPostAppointmentDetails = async () => {
  try {
    const response = await axiosInstance.get(
      "/history/post-appointment-details"
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getPostAppointmentDetailsById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/history/post-appointment-details/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const editPostAppointmentDetails = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/history/post-appointment-details/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deletePostAppointmentDetails = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/history/post-appointment-details/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllPaymentHistory = async () => {
  try {
    const response = await axiosInstance.get("/history/payment-history");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getPaymentHistoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/history/payment-history/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const editPaymentHistory = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/history/payment-history/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deletePaymentHistory = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/history/payment-history/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
