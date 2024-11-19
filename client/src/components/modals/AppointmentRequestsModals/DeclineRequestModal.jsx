import React, { useState, useEffect } from "react";
import { getUsersByRole } from "../../../services/userService";
import { declineAppointmentRequest } from "../../../services/appointmentRequestService";

const DeclineRequestModal = ({ appointmentRequest, onClose, refreshData }) => {
  const [remark, setRemark] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [assignedVet, setAssignedVet] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [formError, setFormError] = useState("");

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

  const handleDecline = async () => {
    if (!rescheduleDate) {
      setFormError(
        "Reschedule date and time are required when declining an appointment."
      );
      return;
    }

    if (!remark) {
      setFormError("Remarks are required when declining an appointment.");
      return;
    }

    if (!assignedVet) {
      setFormError("Veterinarian is required.");
      return;
    }

    try {
      await declineAppointmentRequest(
        appointmentRequest.id,
        remark,
        rescheduleDate,
        assignedVet
      );
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error declining appointment request:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg w-[32rem] h-[60vh] overflow-auto shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Decline Appointment Request
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Reschedule Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={rescheduleDate}
            onChange={(e) => setRescheduleDate(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            required
          />
          {formError && !rescheduleDate && (
            <p className="text-sm text-red-500 mt-2">{formError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Veterinarian <span className="text-red-500">*</span>
          </label>
          <select
            value={assignedVet}
            onChange={(e) => setAssignedVet(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            required
          >
            <option value="" disabled>
              Select Veterinarian...
            </option>
            {staffMembers.length > 0 ? (
              staffMembers.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.firstName} {staff.lastName}
                </option>
              ))
            ) : (
              <option>No staff available</option>
            )}
          </select>
          {formError && !assignedVet && (
            <p className="text-sm text-red-500 mt-2">{formError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Remarks <span className="text-red-500">*</span>
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your remarks"
            className="w-full p-2 border rounded-md mt-2"
            required
          />
          {formError && !remark && (
            <p className="text-sm text-red-500 mt-2">{formError}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclineRequestModal;
