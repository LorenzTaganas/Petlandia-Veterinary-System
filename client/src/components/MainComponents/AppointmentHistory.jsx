import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Visibility, Comment } from "@mui/icons-material";
import { getAllPostAppointmentDetails } from "../../services/historyService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";
import { getUserProfile, getFullName } from "../../services/userService";
import ViewAppointmentHistoryModal from "../modals/HistoryModals/ViewApointmentHistoryModal";
import ViewStaffRemarkModal from "../modals/HistoryModals/ViewStaffRemarkModal";

const AppointmentHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [isAccomplishmentModalOpen, setIsAccomplishmentModalOpen] =
    useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const fetchAppointmentSchedules = async () => {
    setLoading(true);
    try {
      const data = await getAllPostAppointmentDetails();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching appointment schedules:", error);
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
    fetchAppointmentSchedules();
    fetchUserProfile();
  }, []);

  const refreshData = () => {
    fetchAppointmentSchedules();
  };

  const filterRequests = () => {
    if (userProfile?.isAdmin) return requests;
    if (userProfile?.isClient) {
      return requests.filter((request) => request.owner?.id === userProfile.id);
    }
    if (userProfile?.isStaff) {
      return requests.filter(
        (request) => request.assignedVet?.id === userProfile.id
      );
    }
    return [];
  };

  const handleViewStaffRemark = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsRemarkModalOpen(true);
  };

  const handleViewAppointmentHistory = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsAccomplishmentModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Appointment History</h2>
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
                {!userProfile?.isClient && (
                  <th className="px-4 py-3 rounded-l-lg">Owner Name</th>
                )}

                {userProfile?.isClient ? (
                  <th className="px-4 py-3 rounded-l-lg">Date Accomplished</th>
                ) : (
                  <th className="px-4 py-3">Date Accomplished</th>
                )}
                <th className="px-4 py-3">Appointment Date</th>
                <th className="px-4 py-3">Appointment Type</th>
                <th className="px-4 py-3">Assigned Staff</th>
                <th className="px-4 py-3">Pet Name</th>
                <th className="px-4 py-3">Pet Type</th>
                <th className="px-4 py-3">Pet Breed</th>
                <th className="px-4 py-3 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterRequests().length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="9"
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
                    {!userProfile?.isClient && (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        {getFullName(request.owner) || "Unknown"}
                      </td>
                    )}
                    {userProfile?.isClient ? (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        <DateTimeDisplay date={request.dateAccomplished} />
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-center">
                        <DateTimeDisplay date={request.dateAccomplished} />
                      </td>
                    )}
                    <td className="px-4 py-3 text-center">
                      <DateTimeDisplay date={request.appointmentDate} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.appointmentType}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.assignedVet
                        ? getFullName(request.assignedVet)
                        : "Not assigned"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.pet?.name || "No pet"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.pet?.type || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.pet?.breed || "Unknown"}
                    </td>
                    <td className="px-2 py-3 text-center rounded-r-lg">
                      <div className="flex flex-col justify-center gap-1.5">
                        <div className="flex justify-center gap-1.5 mt-1">
                          <Tooltip title="View All Details">
                            <IconButton
                              onClick={() =>
                                handleViewAppointmentHistory(request.id)
                              }
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Staff's Remark">
                            <IconButton
                              onClick={() => handleViewStaffRemark(request.id)}
                            >
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
      <ViewAppointmentHistoryModal
        appointmentId={selectedAppointmentId}
        isVisible={isAccomplishmentModalOpen}
        onClose={() => setIsAccomplishmentModalOpen(false)}
        refreshData={refreshData}
      />
      <ViewStaffRemarkModal
        appointmentId={selectedAppointmentId}
        isVisible={isRemarkModalOpen}
        onClose={() => setIsRemarkModalOpen(false)}
      />
    </div>
  );
};

export default AppointmentHistory;
