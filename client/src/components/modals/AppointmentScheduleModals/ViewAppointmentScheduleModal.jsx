import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
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
import { formatDateForInput, formatDate } from "../../../utils/dateTimeUtil";

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
  const [formErrors, setFormErrors] = useState({});

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
        appointmentDate: formatDateForInput(data.appointmentDate),
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

  const validateForm = () => {
    const errors = {};

    if (!formData.appointmentDate) {
      errors.appointmentDate = "Appointment date is required.";
    }

    if (!formData.assignedVetId) {
      errors.assignedVetId = "Assigned veterinarian is required.";
    }

    if (
      formData.assignedVetId &&
      formData.appointmentDate &&
      vetAvailability[formData.assignedVetId] === false
    ) {
      errors.vetConflict = "Selected staff is occupied at the assigned date.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setFormErrors({});
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
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
      } catch (error) {
        console.error("Error saving appointment details:", error);
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteAppointmentRequest(appointmentId);
      onClose();
      refreshData();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "appointmentDate" || name === "assignedVetId") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
        vetConflict: "",
      }));
    }
  };

  return (
    <Modal open={isVisible} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg w-[32rem] mx-auto mt-20 h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Appointment Date & Time
            </label>
            <input
              type="datetime-local"
              className={`w-full mb-4 p-2 border rounded ${
                formErrors.appointmentDate ? "border-red-500" : ""
              }`}
              value={formData.appointmentDate}
              onChange={handleChange}
              name="appointmentDate"
              disabled={!isEditing}
            />
            {formErrors.appointmentDate && (
              <p className="text-sm text-red-500">
                {formErrors.appointmentDate}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Appointment Type
            </label>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={formData.appointmentType}
              onChange={handleChange}
              name="appointmentType"
              disabled={!isEditing}
            >
              <option value="Checkup">Checkup</option>
              <option value="Treatment">Treatment</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Assigned Veterinarian
            </label>
            <select
              className={`w-full mb-4 p-2 border rounded ${
                formErrors.assignedVetId || formErrors.vetConflict
                  ? "border-red-500"
                  : ""
              }`}
              value={formData.assignedVetId}
              onChange={handleChange}
              name="assignedVetId"
              disabled={!isEditing}
            >
              {staffMembers.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.firstName} {staff.lastName}
                </option>
              ))}
            </select>
            {formErrors.assignedVetId && (
              <p className="text-sm text-red-500">{formErrors.assignedVetId}</p>
            )}
            {formErrors.vetConflict && (
              <p className="text-sm text-red-500">{formErrors.vetConflict}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Pet Name
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded"
              value={formData.petName}
              onChange={handleChange}
              name="petName"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Pet Type
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded"
              value={formData.petType}
              onChange={handleChange}
              name="petType"
              disabled={!isEditing}
            />
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
              className="w-full mb-4 p-2 border rounded"
              value={formData.petAge || ""}
              onChange={handleChange}
              name="petAge"
              disabled={!isEditing}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Pet Weight
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded"
              value={formData.petWeight || ""}
              onChange={handleChange}
              name="petWeight"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Reason for Appointment
          </label>
          <textarea
            className="w-full mb-4 p-2 border rounded"
            value={formData.reason}
            onChange={handleChange}
            name="reason"
            disabled={!isEditing}
          />
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
  );
};

export default ViewAppointmentScheduleModal;
