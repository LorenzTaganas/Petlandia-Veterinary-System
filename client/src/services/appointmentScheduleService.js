import axiosInstance from "./axiosInstance";

export const getAppointmentSchedules = async () => {
  try {
    const response = await axiosInstance.get("/appointment-schedule");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointment schedules:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAppointmentScheduleDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/appointment-schedule/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointment schedule details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editAppointmentSchedule = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/appointment-schedule/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error editing appointment schedule:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/appointment-schedule/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error canceling appointment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
