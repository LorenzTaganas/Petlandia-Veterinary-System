import React, { useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add,
  CheckCircle,
  Cancel,
  Visibility,
  Comment,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import {
  getAllAppointmentRequests,
  getAppointmentRequestDetails,
  createAppointmentRequest,
  rescheduleAppointmentRequest,
} from "../../services/appointmentRequestService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";
import AddAppointmentRequestModal from "../modals/AppointmentRequestsModals/AddAppointmentRequestModal";
import ViewAppointmentRequestModal from "../modals/AppointmentRequestsModals/ViewAppointmentRequestModal";
import ApproveRequestModal from "../modals/AppointmentRequestsModals/ApproveRequestModal";
import DeclineRequestModal from "../modals/AppointmentRequestsModals/DeclineRequestModal";
import RemarkModal from "../modals/AppointmentRequestsModals/RemarkModal";
import { getUserProfile, getFullName } from "../../services/userService";
import { formatDateForInput } from "../../utils/dateTimeUtil";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddRequestModal, setOpenAddRequestModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedAppointmentRequest, setSelectedAppointmentRequest] =
    useState(null);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openDeclineModal, setOpenDeclineModal] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState(null);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("requestedAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("All");
  const [remarkDetails, setRemarkDetails] = useState({
    remark: null,
    status: null,
    declinedAt: null,
    declinedBy: null,
    rescheduleDate: null,
  });

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

      if (profile.isAdmin) {
        setUserRole("Admin");
      } else if (profile.isStaff) {
        setUserRole("Staff");
      } else if (profile.isClient) {
        setUserRole("Client");
      }
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
    let filteredRequests = [];

    if (userProfile?.isAdmin) {
      filteredRequests = requests;
    } else if (userProfile?.isClient) {
      filteredRequests = requests.filter(
        (request) => request.owner?.id === userProfile.id
      );
    }

    if (statusFilter !== "All") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === statusFilter
      );
    }

    return filteredRequests.sort((a, b) => {
      let comparison = 0;

      const fieldToSort =
        sortBy === "requestedAt" ? "requestedAt" : "appointmentDate";

      if (a[fieldToSort] < b[fieldToSort]) {
        comparison = -1;
      }
      if (a[fieldToSort] > b[fieldToSort]) {
        comparison = 1;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };
  const handleApproveRequest = (request) => {
    setSelectedAppointmentRequest(request);
    setOpenApproveModal(true);
  };

  const handleDeclineRequest = (request) => {
    setSelectedAppointmentRequest(request);
    setOpenDeclineModal(true);
  };

  const handleRemarkClick = async (appointmentId) => {
    try {
      const response = await getAppointmentRequestDetails(appointmentId);

      const declinedByUser = response.declinedBy
        ? await getUserProfile(response.declinedBy)
        : null;

      const assignedVetUser = response.assignedVetId
        ? await getUserProfile(response.assignedVetId)
        : null;

      setRemarkDetails({
        id: response.id,
        remark: response.remark,
        status: response.status,
        declinedAt: response.declinedAt,
        declinedBy: declinedByUser
          ? getFullName(declinedByUser)
          : response.declinedBy,
        rescheduleDate: response.rescheduleDate,
        assignedVet: assignedVetUser ? getFullName(assignedVetUser) : "N/A",
      });
      setIsRemarkModalOpen(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const handleAcceptReschedule = async () => {
    const appointmentId = remarkDetails?.id;
    const rescheduleDate = remarkDetails?.rescheduleDate;
    const assignedVetId = remarkDetails?.assignedVetId;

    try {
      const formattedDate = formatDateForInput(rescheduleDate);

      const updatedAppointment = await rescheduleAppointmentRequest(
        appointmentId,
        formattedDate,
        "Reschedule accepted",
        true,
        assignedVetId
      );
      if (updatedAppointment) {
        setRemarkDetails(updatedAppointment);
        refreshData();
      }
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      closeRemarkModal();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
  };

  const closeRemarkModal = () => {
    setIsRemarkModalOpen(false);
    setRemarkDetails({
      remark: null,
      status: null,
      declinedAt: null,
      declinedBy: null,
    });
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
              <MenuItem value="requestedAt">Requested At</MenuItem>
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
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Declined">Declined</MenuItem>
            </Select>
          </FormControl>
        </div>
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
                {!userProfile?.isClient && (
                  <th className="px-4 py-3 rounded-l-lg">Owner Name</th>
                )}
                {userProfile?.isClient ? (
                  <th className="px-4 py-3 rounded-l-lg">Requested At</th>
                ) : (
                  <th className="px-4 py-3">Requested At</th>
                )}
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
                    {!userProfile?.isClient && (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        {getFullName(request.owner)}
                      </td>
                    )}
                    {userProfile?.isClient ? (
                      <td className="px-4 py-3 text-center rounded-l-lg">
                        <DateTimeDisplay date={request.requestedAt} />
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-center">
                        <DateTimeDisplay date={request.requestedAt} />
                      </td>
                    )}
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
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 text-sm font-semibold rounded ${
                          request.status === "Pending"
                            ? "bg-yellow-300"
                            : request.status === "Declined"
                            ? "bg-red-300"
                            : "bg-gray-200"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center rounded-r-lg">
                      <div className="flex flex-col justify-center gap-0.5">
                        <div className="flex justify-center gap-0.5 mt-1">
                          {userProfile?.isAdmin &&
                            request.status !== "Declined" && (
                              <>
                                <Tooltip title="Accept Appointment">
                                  <IconButton
                                    color="success"
                                    onClick={() =>
                                      handleApproveRequest(request)
                                    }
                                  >
                                    <CheckCircle />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Decline Appointment">
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      handleDeclineRequest(request)
                                    }
                                  >
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

                          {request.status !== "Pending" && (
                            <Tooltip title="Admin's Remark">
                              <IconButton
                                onClick={() => handleRemarkClick(request.id)}
                              >
                                <Comment />
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
      {openApproveModal && (
        <ApproveRequestModal
          appointmentRequest={selectedAppointmentRequest}
          onClose={() => setOpenApproveModal(false)}
          refreshData={refreshData}
        />
      )}
      {openDeclineModal && (
        <DeclineRequestModal
          appointmentRequest={selectedAppointmentRequest}
          onClose={() => setOpenDeclineModal(false)}
          refreshData={refreshData}
        />
      )}
      {isRemarkModalOpen && (
        <RemarkModal
          appointmentId={selectedAppointmentId}
          status={remarkDetails.status}
          remark={remarkDetails.remark}
          declinedAt={remarkDetails.declinedAt}
          declinedBy={remarkDetails.declinedBy}
          rescheduleDate={remarkDetails.rescheduleDate}
          assignedVet={remarkDetails.assignedVet}
          onClose={closeRemarkModal}
          userClient={userProfile.isClient}
          onAcceptReschedule={(appointmentId) =>
            handleAcceptReschedule(appointmentId)
          }
        />
      )}
      <Dialog open={isSuccessModalOpen} onClose={handleCloseSuccess}>
        <DialogTitle color="success.main">Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reschedule proposal accepted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentRequests;
