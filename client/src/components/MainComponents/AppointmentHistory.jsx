import React, { useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  Comment,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { getAllPostAppointmentDetails } from "../../services/historyService";
import { getStaffRemarksById } from "../../services/historyService";
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
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const [sortBy, setSortBy] = useState("dateAccomplished");
  const [sortOrder, setSortOrder] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("All");

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
    let filteredRequests = [];

    if (userProfile?.isAdmin) {
      filteredRequests = requests;
    } else if (userProfile?.isClient) {
      filteredRequests = requests.filter(
        (request) => request.owner?.id === userProfile.id
      );
    } else if (userProfile?.isStaff) {
      filteredRequests = requests.filter(
        (request) => request.assignedVet?.id === userProfile.id
      );
    }

    if (typeFilter !== "All") {
      filteredRequests = filteredRequests.filter(
        (request) => request.appointmentType === typeFilter
      );
    }

    return filteredRequests.sort((a, b) => {
      let comparison = 0;
      const dateA =
        sortBy === "dateAccomplished"
          ? new Date(a.dateAccomplished)
          : new Date(a.appointmentDate);
      const dateB =
        sortBy === "dateAccomplished"
          ? new Date(b.dateAccomplished)
          : new Date(b.appointmentDate);

      if (dateA < dateB) comparison = -1;
      if (dateA > dateB) comparison = 1;

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handleViewStaffRemark = async (historyId) => {
    try {
      setSelectedHistoryId(historyId);
      const remarkData = await getStaffRemarksById(historyId);
      setSelectedHistoryId(remarkData.id);
      setIsRemarkModalOpen(true);
    } catch (error) {
      console.error("Error fetching staff remarks:", error);
    }
  };

  const handleViewAppointmentHistory = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsAccomplishmentModalOpen(true);
  };

  return (
    <div className="m-0">
      <div className="flex space-x-2 mb-4">
        <FormControl variant="outlined" size="small" className="w-40">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="dateAccomplished">Date Accomplished</MenuItem>
            <MenuItem value="appointmentDate">Appointment Date</MenuItem>
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
          <InputLabel>Appointment Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            label="Appointment Type"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Checkup">Checkup</MenuItem>
            <MenuItem value="Treatment">Treatment</MenuItem>
            <MenuItem value="Grooming">Grooming</MenuItem>
          </Select>
        </FormControl>
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
                              onClick={() =>
                                handleViewStaffRemark(request.historyId)
                              }
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
        historyId={selectedHistoryId}
        isVisible={isRemarkModalOpen}
        onClose={() => setIsRemarkModalOpen(false)}
      />
    </div>
  );
};

export default AppointmentHistory;
