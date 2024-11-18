import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, Button } from "@mui/material";
import {
  Add,
  CheckCircle,
  Cancel,
  Visibility,
  Comment,
} from "@mui/icons-material";
import {
  getAllAppointmentRequests,
  createAppointmentRequest,
} from "../../services/appointmentRequestService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";
import AddAppointmentRequestModal from "../modals/AppointmentRequestsModals/AddAppointmentRequestModal";
import ViewAppointmentRequestModal from "../modals/AppointmentRequestsModals/ViewAppointmentRequestModal";
import { getUserProfile, getFullName } from "../../services/userService";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddRequestModal, setOpenAddRequestModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const fetchAppointmentRequests = async () => {
    setLoading(true);
    try {
      const data = await getAllAppointmentRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching appointment requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentRequests();
    fetchUserProfile();
  }, []);

  const refreshData = () => {
    fetchAppointmentRequests();
  };

  const handleAddAppointmentRequest = async (newAppointment) => {
    try {
      const response = await createAppointmentRequest(
        newAppointment.appointmentDate,
        newAppointment.appointmentType,
        newAppointment.preferredVetId,
        newAppointment.petDetails.name,
        newAppointment.petDetails.type,
        newAppointment.petDetails.breed,
        newAppointment.petDetails.age,
        newAppointment.petDetails.weight,
        newAppointment.reason,
        newAppointment.additionalComments
      );

      setRequests((prevRequests) => [...prevRequests, response]);
      setOpenAddRequestModal(false);
    } catch (error) {
      console.error("Error creating appointment request:", error);
    }
  };

  const handleViewDetailsClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  const filterRequests = () => {
    if (userProfile?.isAdmin) return requests;
    if (userProfile?.isClient) {
      return requests.filter((request) => request.owner?.id === userProfile.id);
    }
    return [];
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Appointment Requests</h2>
        {userProfile?.isClient && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
            onClick={() => setOpenAddRequestModal(true)}
          >
            <Add className="mr-2" />
            Add Appointment
          </button>
        )}
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
                <th className="px-4 py-3 rounded-l-lg">Owner Name</th>
                <th className="px-4 py-3">Requested At</th>
                <th className="px-4 py-3">Appointment Date</th>
                <th className="px-4 py-3">Appointment Type</th>
                <th className="px-4 py-3">Pet Type</th>
                <th className="px-4 py-3">Pet Breed</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterRequests().length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="8"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                filterRequests().map((request, index) => (
                  <tr
                    key={request.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } shadow-md`}
                  >
                    <td className="px-4 py-3 text-center rounded-l-lg">
                      {getFullName(request.owner)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DateTimeDisplay date={request.requestedAt} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DateTimeDisplay date={request.appointmentDate} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.appointmentType}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.pet.type}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.pet?.breed || "(unknown)"}
                    </td>
                    <td className="px-4 py-3 text-center">{request.status}</td>
                    <td className="px-2 py-3 text-center rounded-r-lg">
                      <div className="flex flex-col justify-center gap-0.5">
                        <div className="flex justify-center gap-0.5 mt-1">
                          {userProfile?.isAdmin && (
                            <>
                              <Tooltip title="Accept Appointment">
                                <IconButton color="success">
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Decline Appointment">
                                <IconButton color="error">
                                  <Cancel />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="View All Details">
                            <IconButton
                              onClick={() => handleViewDetailsClick(request.id)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Admin's Remark">
                            <IconButton>
                              <Comment />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <AddAppointmentRequestModal
        open={openAddRequestModal}
        onClose={() => setOpenAddRequestModal(false)}
        onSave={handleAddAppointmentRequest}
      />
      <ViewAppointmentRequestModal
        appointmentId={selectedAppointmentId}
        isVisible={!!selectedAppointmentId}
        onClose={() => setSelectedAppointmentId(null)}
        refreshData={refreshData}
      />
    </div>
  );
};

export default AppointmentRequests;
