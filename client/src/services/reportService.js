import axiosInstance from "./axiosInstance";

export const getReports = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get("/reports", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching reports: " + error.message);
  }
};

export const getTopClients = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get("/reports/top-clients", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching top clients: " + error.message);
  }
};

export const getRevenueOverview = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get("/reports/revenue-overview", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching revenue overview: " + error.message);
  }
};

export const getMostSelectedAppointmentTypes = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      "/reports/most-selected-appointment-types",
      {
        params: { startDate, endDate },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Error fetching most selected appointment types: " + error.message
    );
  }
};

export const getAssignedStaff = async () => {
  try {
    const response = await axiosInstance.get("/reports/assigned-staff");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching assigned staff: " + error.message);
  }
};

export const getMostPreferredStaff = async () => {
  try {
    const response = await axiosInstance.get("/reports/most-preferred-staff");
    return response.data;
  } catch (error) {
    console.error("Error fetching Most Preferred Staff:", error);
    throw error;
  }
};
