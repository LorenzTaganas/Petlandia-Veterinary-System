import React, { useState, useEffect } from "react";
import { getUsersByRole } from "../../../services/userService";

const AddAppointmentRequestModal = ({ open, onClose, onSave }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [preferredVetId, setPreferredVetId] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [reason, setReason] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const staff = await getUsersByRole("Staff");
        setStaffMembers(staff);
      } catch (error) {
        console.error("Error fetching staff members:", error);
      }
    };

    if (open) {
      fetchStaffMembers();
    }
  }, [open]);

  const handleSave = () => {
    if (
      !appointmentDate ||
      !appointmentType ||
      !preferredVetId ||
      !petName ||
      !petType ||
      !reason
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const newAppointment = {
      appointmentDate,
      appointmentType,
      preferredVetId,
      petDetails: {
        name: petName || "",
        type: petType || "",
        breed: petBreed || "",
        age: petAge || "",
        weight: petWeight || "",
      },
      reason,
      additionalComments,
    };

    console.log("Appointment Data:", newAppointment);

    onSave(newAppointment);
    handleClose();
  };

  const handleClose = () => {
    setAppointmentDate("");
    setAppointmentType("");
    setPreferredVetId("");
    setPetName("");
    setPetType("");
    setPetBreed("");
    setPetAge("");
    setPetWeight("");
    setReason("");
    setAdditionalComments("");
    onClose();
  };

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-[32rem] h-[80vh] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">
            Add Appointment Request
          </h2>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full mb-4 p-2 border rounded"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mb-4 p-2 border rounded"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="" disabled>
                  Select Type...
                </option>{" "}
                <option value="Checkup">Checkup</option>
                <option value="Treatment">Treatment</option>
                <option value="Grooming">Grooming</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Preferred Veterinarian <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mb-4 p-2 border rounded"
                value={preferredVetId}
                onChange={(e) => setPreferredVetId(e.target.value)}
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
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Pet Name"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                placeholder="Pet Type"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Breed (Optional)
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                placeholder="Pet Breed"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Age (Optional)
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
                placeholder="Pet Age"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Pet Weight (Optional)
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={petWeight}
                onChange={(e) => setPetWeight(e.target.value)}
                placeholder="Pet Weight"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Reason for Appointment <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full mb-4 p-2 border rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for Appointment"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              className="w-full mb-4 p-2 border rounded"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Additional Comments"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddAppointmentRequestModal;
