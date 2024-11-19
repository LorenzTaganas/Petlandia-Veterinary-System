import React, { useState, useEffect } from "react";
import { getUsersByRole } from "../../../services/userService";
import { acceptAppointmentRequest } from "../../../services/appointmentRequestService";

const ApproveRequestModal = ({ appointmentRequest, onClose, refreshData }) => {
  const [assignedVet, setAssignedVet] = useState("");
  const [remark, setRemark] = useState("");
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

  const handleApprove = async () => {
    if (!assignedVet) {
      setFormError("Veterinarian is required.");
      return;
    }

    try {
      await acceptAppointmentRequest(
        appointmentRequest.id,
        assignedVet,
        remark
      );
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error approving appointment request:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg w-[32rem] h-[50vh] overflow-auto shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Approve Appointment Request
        </h3>

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
            Remarks (Optional)
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Optional remark"
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleApprove}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequestModal;
