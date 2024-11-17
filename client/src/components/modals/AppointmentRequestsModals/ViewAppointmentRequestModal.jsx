import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
import {
  getAppointmentRequestDetails,
  editAppointmentRequest,
  deleteAppointmentRequest,
} from "../../../services/appointmentRequestService";
import { getUsersByRole } from "../../../services/userService";
import { formatDateForInput } from "../../../utils/dateTimeUtil";

const ViewAppointmentRequestModal = ({
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
    preferredVetId: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    reason: "",
    additionalComments: "",
  });
  const [staffMembers, setStaffMembers] = useState([]);

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

  const fetchAppointmentDetails = async () => {
    try {
      const data = await getAppointmentRequestDetails(appointmentId);
      setAppointmentDetails(data);
      setFormData({
        appointmentDate: formatDateForInput(data.appointmentDate),
        appointmentType: data.appointmentType,
        preferredVetId: data.preferredVetId,
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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        appointmentDate: formatDateForInput(formData.appointmentDate),
        appointmentType: formData.appointmentType,
        preferredVetId: formData.preferredVetId,
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

      await editAppointmentRequest(appointmentId, updatedData);
      setIsEditing(false);
      fetchAppointmentDetails();
      refreshData();
    } catch (error) {
      console.error("Error saving appointment details:", error);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              className="w-full mb-4 p-2 border rounded"
              value={formData.appointmentDate}
              onChange={handleChange}
              name="appointmentDate"
              disabled={!isEditing}
            />
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
              Preferred Veterinarian
            </label>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={formData.preferredVetId}
              onChange={handleChange}
              name="preferredVetId"
              disabled={!isEditing}
            >
              {staffMembers.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.firstName} {staff.lastName}
                </option>
              ))}
            </select>
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
              value={formData.petBreed}
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
              value={formData.petAge}
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
              value={formData.petWeight}
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
            value={formData.additionalComments}
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
          <button
            className={
              "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            }
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
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

export default ViewAppointmentRequestModal;
