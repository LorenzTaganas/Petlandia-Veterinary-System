import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { getUsersByRole } from "../../../services/userService";
import { declineAppointmentRequest } from "../../../services/appointmentRequestService";

const DeclineRequestModal = ({ appointmentRequest, onClose, refreshData }) => {
  const [remark, setRemark] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [assignedVet, setAssignedVet] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  const validateForm = () => {
    const errors = {};

    if (!rescheduleDate) {
      errors.rescheduleDate =
        "Reschedule date and time are required when declining an appointment.";
    }

    if (!remark) {
      errors.remark = "Remarks are required when declining an appointment.";
    }

    if (!assignedVet) {
      errors.assignedVet = "Veterinarian is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDecline = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleDeclineConfirm = async () => {
    try {
      await declineAppointmentRequest(
        appointmentRequest.id,
        remark,
        rescheduleDate,
        assignedVet
      );
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error declining appointment request:", error);
    }
  };

  const handleClose = () => {
    setRemark("");
    setRescheduleDate("");
    setAssignedVet("");
    setFormErrors({});
    onClose();
  };

  return (
    <>
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
              onChange={(e) => {
                setRescheduleDate(e.target.value);
                setFormErrors((prev) => ({ ...prev, rescheduleDate: "" }));
              }}
              className={`w-full p-2 border rounded-md mt-2 ${
                formErrors.rescheduleDate ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.rescheduleDate && (
              <p className="text-sm text-red-500 mt-2">
                {formErrors.rescheduleDate}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Veterinarian <span className="text-red-500">*</span>
            </label>
            <select
              value={assignedVet}
              onChange={(e) => {
                setAssignedVet(e.target.value);
                setFormErrors((prev) => ({ ...prev, assignedVet: "" }));
              }}
              className={`w-full p-2 border rounded-md mt-2 ${
                formErrors.assignedVet ? "border-red-500" : ""
              }`}
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
            {formErrors.assignedVet && (
              <p className="text-sm text-red-500 mt-2">
                {formErrors.assignedVet}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Remarks <span className="text-red-500">*</span>
            </label>
            <textarea
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
                setFormErrors((prev) => ({ ...prev, remark: "" }));
              }}
              placeholder="Enter your remarks"
              className={`w-full p-2 border rounded-md mt-2 ${
                formErrors.remark ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.remark && (
              <p className="text-sm text-red-500 mt-2">{formErrors.remark}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={handleClose}
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

      <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Appointment Decline</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to decline this appointment request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsConfirmModalOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeclineConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          handleClose();
          refreshData();
        }}
      >
        <DialogTitle
          sx={{
            // fontWeight: "bold",
            color: "success.main",
          }}
        >
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Appointment request declined successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsSuccessModalOpen(false);
              handleClose();
              refreshData();
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeclineRequestModal;
