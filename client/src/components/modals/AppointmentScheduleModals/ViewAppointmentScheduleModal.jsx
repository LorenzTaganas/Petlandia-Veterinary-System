import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteAppointmentRequest } from "../../../services/appointmentRequestService";
import { editAppointmentSchedule } from "../../../services/appointmentScheduleService";
import { getAppointmentScheduleDetails } from "../../../services/appointmentScheduleService";
import { checkVetAvailability } from "../../../services/appointmentRequestService";
import {
  getUserProfile,
  getUsersByRole,
  getUserById,
  getFullName,
} from "../../../services/userService";
import {
  formatDateForInput,
  formatDateForInput2,
  formatDate,
} from "../../../utils/dateTimeUtil";

const ViewAppointmentScheduleModal = ({
  appointmentId,
  isVisible,
  onClose,
  refreshData,
}) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentType: "",
    assignedVetId: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    reason: "",
    additionalComments: "",
  });
  const [staffMembers, setStaffMembers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [approvedByUser, setApprovedByUser] = useState(null);
  const [vetAvailability, setVetAvailability] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const staff = await getUsersByRole("Staff");
        setStaffMembers(staff);
      } catch (error) {
        console.error("Error fetching staff members:", error);
      }
    };

    fetchStaffMembers();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserRole(userProfile.role);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsEditing(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (formData.appointmentDate && formData.assignedVetId) {
        try {
          const availability = await checkVetAvailability(
            formData.assignedVetId,
            formData.appointmentDate,
            appointmentId
          );

          setVetAvailability((prev) => ({
            ...prev,
            [formData.assignedVetId]: availability.isAvailable,
          }));
        } catch (error) {
          console.error("Error checking vet availability:", error);
          setVetAvailability((prev) => ({
            ...prev,
            [formData.assignedVetId]: true,
          }));
        }
      }
    };

    if (isEditing) {
      checkAvailability();
    }
  }, [formData.appointmentDate, formData.assignedVetId, isEditing]);

  const fetchAppointmentDetails = async () => {
    try {
      const data = await getAppointmentScheduleDetails(appointmentId);
      setAppointmentDetails(data);
      if (data.approvedBy) {
        const approvedByUser = await getUserById(data.approvedBy);
        setApprovedByUser(approvedByUser);
      }

      setFormData({
        appointmentDate: formatDateForInput2(data.appointmentDate),
        appointmentType: data.appointmentType,
        assignedVetId: data.assignedVetId,
        petName: data.pet.name,
        petType: data.pet.type,
        petBreed: data.pet.breed,
        petAge: data.pet.age,
        petWeight: data.pet.weight,
        reason: data.reason,
        additionalComments: data.additionalComments,
      });
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "petAge":
        return value === "" || /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
          ? ""
          : "Age must be a number";
      case "petWeight":
        return value === "" || /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
          ? ""
          : "Weight must be a number";
      case "appointmentDate":
        return value ? "" : "Appointment date is required";
      case "appointmentType":
        return value ? "" : "Appointment type is required";
      case "assignedVetId":
        return value ? "" : "Assigned veterinarian is required";
      case "petName":
        return value ? "" : "Pet name is required";
      case "petType":
        return value ? "" : "Pet type is required";
      case "reason":
        return value ? "" : "Reason is required";
      default:
        return "";
    }
  };

  const handleValidation = (name, value) => {
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = [
      "appointmentDate",
      "appointmentType",
      "assignedVetId",
      "petName",
      "petType",
      "reason",
      "petAge",
      "petWeight",
    ];

    fields.forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    if (
      formData.assignedVetId &&
      formData.appointmentDate &&
      vetAvailability[formData.assignedVetId] === false
    ) {
      newErrors.vetConflict =
        "Selected staff is occupied at the assigned date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setErrors({});
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleSaveConfirm = async () => {
    setIsConfirmModalOpen(false);
    try {
      const updatedData = {
        appointmentDate: formatDateForInput(formData.appointmentDate),
        appointmentType: formData.appointmentType,
        assignedVetId: formData.assignedVetId,
        reason: formData.reason,
        additionalComments: formData.additionalComments,
        pet: {
          id: appointmentDetails.pet.id,
          name: formData.petName,
          type: formData.petType,
          breed: formData.petBreed,
          age: formData.petAge,
          weight: formData.petWeight,
        },
      };

      if (appointmentDetails.status === "Declined") {
        updatedData.status = "Pending";
      }

      await editAppointmentSchedule(appointmentId, updatedData);
      setIsEditing(false);
      fetchAppointmentDetails();
      refreshData();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error saving appointment details:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteConfirmModalOpen(false);
    try {
      await deleteAppointmentRequest(appointmentId);
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleDeleteSuccessClose = () => {
    setIsDeleteSuccessModalOpen(false);
    onClose();
    refreshData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);

    if (name === "appointmentDate" || name === "assignedVetId") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        vetConflict: "",
      }));
    }
  };

  return (
    <>
      <Modal open={isVisible} onClose={onClose}>
        <div className="bg-white p-6 rounded-lg w-[32rem] mx-auto mt-20 h-[80vh] overflow-auto z-50">
          <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Date & Time
              </label>
              <input
                type="datetime-local"
                className={`w-full mb-4 p-2 border rounded ${
                  errors.appointmentDate ? "border-red-500" : ""
                }`}
                value={formData.appointmentDate}
                onChange={handleChange}
                name="appointmentDate"
                disabled={!isEditing}
              />
              {errors.appointmentDate && (
                <p className="text-red-500 text-sm">{errors.appointmentDate}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Type
              </label>
              <select
                className={`w-full mb-4 p-2 border rounded ${
                  errors.appointmentType ? "border-red-500" : ""
                }`}
                value={formData.appointmentType}
                onChange={handleChange}
                name="appointmentType"
                disabled={!isEditing}
              >
                <option value="" disabled>
                  Select Type...
                </option>
                <option value="Checkup">Checkup</option>
                <option value="Treatment">Treatment</option>
                <option value="Grooming">Grooming</option>
              </select>
              {errors.appointmentType && (
                <p className="text-red-500 text-sm">{errors.appointmentType}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Assigned Veterinarian
              </label>
              <select
                className={`w-full mb-4 p-2 border rounded ${
                  errors.assignedVetId || errors.vetConflict
                    ? "border-red-500"
                    : ""
                }`}
                value={formData.assignedVetId}
                onChange={handleChange}
                name="assignedVetId"
                disabled={!isEditing}
              >
                <option value="" disabled>
                  Select Veterinarian...
                </option>
                {staffMembers.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.firstName} {staff.lastName}
                  </option>
                ))}
              </select>
              {errors.assignedVetId && (
                <p className="text-red-500 text-sm">{errors.assignedVetId}</p>
              )}
              {errors.vetConflict && (
                <p className="text-red-500 text-sm">{errors.vetConflict}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Name
              </label>
              <input
                type="text"
                className={`w-full mb-4 p-2 border rounded ${
                  errors.petName ? "border-red-500" : ""
                }`}
                value={formData.petName}
                onChange={handleChange}
                name="petName"
                disabled={!isEditing}
              />
              {errors.petName && (
                <p className="text-red-500 text-sm">{errors.petName}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Type
              </label>
              <input
                type="text"
                className={`w-full mb-4 p-2 border rounded ${
                  errors.petType ? "border-red-500" : ""
                }`}
                value={formData.petType}
                onChange={handleChange}
                name="petType"
                disabled={!isEditing}
              />
              {errors.petType && (
                <p className="text-red-500 text-sm">{errors.petType}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Breed
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={formData.petBreed || ""}
                onChange={handleChange}
                name="petBreed"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Age
              </label>
              <input
                type="text"
                className={`w-full mb-4 p-2 border rounded ${
                  errors.petAge ? "border-red-500" : ""
                }`}
                value={formData.petAge || ""}
                onChange={handleChange}
                name="petAge"
                disabled={!isEditing}
              />
              {errors.petAge && (
                <p className="text-red-500 text-sm">{errors.petAge}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Weight
              </label>
              <input
                type="text"
                className={`w-full mb-4 p-2 border rounded ${
                  errors.petWeight ? "border-red-500" : ""
                }`}
                value={formData.petWeight || ""}
                onChange={handleChange}
                name="petWeight"
                disabled={!isEditing}
              />
              {errors.petWeight && (
                <p className="text-red-500 text-sm">{errors.petWeight}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Reason for Appointment
            </label>
            <textarea
              className={`w-full mb-4 p-2 border rounded ${
                errors.reason ? "border-red-500" : ""
              }`}
              value={formData.reason}
              onChange={handleChange}
              name="reason"
              disabled={!isEditing}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Additional Comments
            </label>
            <textarea
              className="w-full mb-4 p-2 border rounded"
              value={formData.additionalComments || ""}
              onChange={handleChange}
              name="additionalComments"
              disabled={!isEditing}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Back
            </button>
            {userRole !== "Client" && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={isEditing ? handleSaveClick : handleEditClick}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Appointment Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save these changes to the appointment
            details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsConfirmModalOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <DialogTitle
          sx={{
            color: "success.main",
          }}
        >
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Appointment details have been successfully updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSuccessModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Appointment Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteConfirmModalOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleteSuccessModalOpen}
        onClose={handleDeleteSuccessClose}
      >
        <DialogTitle
          sx={{
            color: "success.main",
          }}
        >
          Deletion Successful
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The appointment has been successfully deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSuccessClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewAppointmentScheduleModal;
