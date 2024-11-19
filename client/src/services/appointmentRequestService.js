import axiosInstance from "./axiosInstance";

export const createAppointmentRequest = async (
  appointmentDate,
  appointmentType,
  preferredVetId,
  petName,
  petType,
  petBreed,
  petAge,
  petWeight,
  reason,
  additionalComments
) => {
  try {
    const response = await axiosInstance.post("/appointment-requests", {
      appointmentDate,
      appointmentType,
      preferredVetId,
      petDetails: {
        name: petName,
        type: petType,
        breed: petBreed,
        age: petAge,
        weight: petWeight,
      },
      reason,
      additionalComments,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllAppointmentRequests = async () => {
  try {
    const response = await axiosInstance.get("/appointment-requests");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointment requests:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAppointmentRequestDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/appointment-requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointment request details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const acceptAppointmentRequest = async (id, assignedVetId, remark) => {
  try {
    const response = await axiosInstance.put(
      `/appointment-requests/${id}/accept`,
      {
        assignedVetId,
        remark,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error accepting appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const declineAppointmentRequest = async (
  id,
  remark,
  rescheduleDate,
  assignedVetId
) => {
  try {
    const response = await axiosInstance.put(
      `/appointment-requests/${id}/decline`,
      {
        remark,
        rescheduleDate,
        assignedVetId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error declining appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editAppointmentRequest = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/appointment-requests/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error editing appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteAppointmentRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/appointment-requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const rescheduleAppointmentRequest = async (
  id,
  newAppointmentDate,
  remark,
  approve,
  assignedVetId
) => {
  try {
    const response = await axiosInstance.put(
      `/appointment-requests/${id}/reschedule`,
      {
        newAppointmentDate,
        remark,
        approve,
        assignedVetId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error rescheduling appointment request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
