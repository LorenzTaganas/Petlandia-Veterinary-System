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
  DomainVerificationTwoTone,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import {
  getAppointmentSchedules,
  getAppointmentScheduleDetails,
} from "../../services/appointmentScheduleService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";
import { getUserProfile, getFullName } from "../../services/userService";
import ViewAppointmentScheduleModal from "../modals/AppointmentScheduleModals/ViewAppointmentScheduleModal";
import RemarkModal from "../modals/AppointmentRequestsModals/RemarkModal";
import AccomplishmentFormModal from "../modals/AppointmentScheduleModals/AccomplishmentFormModal";

const AppointmentSchedule = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedRemark, setSelectedRemark] = useState(null);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [isAccomplishmentModalOpen, setIsAccomplishmentModalOpen] =
    useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [sortBy, setSortBy] = useState("appointmentDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("All");
  const [remarkDetails, setRemarkDetails] = useState({
    remark: null,
    status: null,
    approvedAt: null,
    approvedBy: null,
  });

  const fetchAppointmentSchedules = async () => {
    setLoading(true);
    try {
      const data = await getAppointmentSchedules();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching appointment schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchAppointmentSchedules();
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

      if (a.appointmentDate < b.appointmentDate) {
        comparison = -1;
      }
      if (a.appointmentDate > b.appointmentDate) {
        comparison = 1;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handleViewDetailsClick = (appointmentId) => {
    const selectedSchedule = requests.find(
      (request) => request.id === appointmentId
    );

    setSelectedAppointmentId(selectedSchedule.id);
  };

  const handleRemarkClick = async (appointmentId) => {
    try {
      const response = await getAppointmentScheduleDetails(appointmentId);

      const approvedByUser = response.approvedBy
        ? await getUserProfile(response.approvedBy)
        : null;

      const assignedVetUser = response.assignedVetId
        ? await getUserProfile(response.assignedVetId)
        : null;

      setRemarkDetails({
        remark: response.remark,
        status: response.status,
        approvedAt: response.approvedAt,
        approvedBy: approvedByUser
          ? getFullName(approvedByUser)
          : response.approvedBy,
        assignedVet: assignedVetUser ? getFullName(assignedVetUser) : "N/A",
      });
      setIsRemarkModalOpen(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const closeRemarkModal = () => {
    setIsRemarkModalOpen(false);
    setRemarkDetails({
      remark: null,
      status: null,
      approvedAt: null,
      approvedBy: null,
    });
  };

  const handleAccomplishmentFormClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsAccomplishmentModalOpen(true);
  };

  return (
    <div className="m-0">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <FormControl variant="outlined" size="small" className="w-40">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
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
                  <th className="px-4 py-3 rounded-l-lg">Appointment Date</th>
                ) : (
                  <th className="px-4 py-3">Appointment Date</th>
                )}
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
                    {!userProfile?.isClient && (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        {getFullName(request.owner)}
                      </td>
                    )}
                    {userProfile?.isClient ? (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        <DateTimeDisplay date={request.appointmentDate} />
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-center">
                        <DateTimeDisplay date={request.appointmentDate} />
                      </td>
                    )}
                    <td className="px-4 py-3 text-center">
                      {request.appointmentType}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {request.assignedVet
                        ? `${request.assignedVet.firstName} ${request.assignedVet.lastName}`
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
                              onClick={() => handleViewDetailsClick(request.id)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          {request.id && (
                            <Tooltip title="Admin's Remark">
                              <IconButton
                                onClick={() => handleRemarkClick(request.id)}
                              >
                                <Comment />
                              </IconButton>
                            </Tooltip>
                          )}
                          {(userProfile?.isStaff || userProfile?.isAdmin) && (
                            <Tooltip title="Accomplishment Form">
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  handleAccomplishmentFormClick(request.id)
                                }
                              >
                                <DomainVerificationTwoTone />
                              </IconButton>
                            </Tooltip>
                          )}
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
      <ViewAppointmentScheduleModal
        appointmentId={selectedAppointmentId}
        isVisible={
          !!selectedAppointmentId &&
          !isRemarkModalOpen &&
          !isAccomplishmentModalOpen
        }
        onClose={() => setSelectedAppointmentId(null)}
        refreshData={refreshData}
      />
      {isRemarkModalOpen && (
        <RemarkModal
          status={remarkDetails.status}
          remark={remarkDetails.remark}
          approvedAt={remarkDetails.approvedAt}
          approvedBy={remarkDetails.approvedBy}
          onClose={closeRemarkModal}
          assignedVet={remarkDetails.assignedVet}
        />
      )}
      {isAccomplishmentModalOpen && (
        <AccomplishmentFormModal
          open={isAccomplishmentModalOpen}
          onClose={() => {
            setIsAccomplishmentModalOpen(false);
            setSelectedAppointmentId(null);
          }}
          appointmentRequestId={selectedAppointmentId}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default AppointmentSchedule;
