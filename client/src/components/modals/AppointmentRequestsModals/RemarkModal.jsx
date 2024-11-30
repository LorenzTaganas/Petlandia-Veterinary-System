import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { formatDate } from "../../../utils/dateTimeUtil";

const RemarkModal = ({
  appointmentId,
  status,
  remark,
  approvedAt,
  approvedBy,
  declinedAt,
  declinedBy,
  rescheduleDate,
  assignedVet,
  onClose,
  userClient,
  onAcceptReschedule,
}) => {
  const isApproved = status === "Approved";
  const isDeclined = status === "Declined";
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleAcceptReschedule = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAccept = async () => {
    try {
      await onAcceptReschedule(appointmentId);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error accepting reschedule:", error);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="modal-content bg-white p-6 rounded-lg w-[32rem] h-auto max-h-[50vh] overflow-auto shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Admin's Remark</h3>

          {(isApproved || isDeclined) && (
            <div className="mb-4">
              {isApproved && (
                <>
                  <p className="text-sm">
                    <strong>Approved At:</strong>{" "}
                    {formatDate(approvedAt).date +
                      " " +
                      formatDate(approvedAt).time}
                  </p>
                  <p className="text-sm">
                    <strong>Approved By:</strong> {approvedBy || "N/A"}
                  </p>
                </>
              )}
              {isDeclined && (
                <>
                  <p className="text-sm">
                    <strong>Declined At:</strong>{" "}
                    {formatDate(declinedAt).date +
                      " " +
                      formatDate(declinedAt).time || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>Declined By:</strong> {declinedBy || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>Reschedule Date Proposal:</strong>{" "}
                    {formatDate(rescheduleDate).date +
                      " " +
                      formatDate(rescheduleDate).time || "N/A"}
                  </p>
                </>
              )}
              <p className="text-sm">
                <strong>Assigned Veterinarian:</strong> {assignedVet || "N/A"}
              </p>
            </div>
          )}

          <div className="mb-4">
            <p className="font-semibold mb-1">Remark:</p>
            <textarea
              readOnly
              value={remark || "(None)"}
              className={`w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm ${
                remark ? "" : "text-gray-500"
              }`}
            ></textarea>
          </div>

          {userClient && isDeclined && (
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={onClose}
              >
                Close
              </button>
              <button
                onClick={handleAcceptReschedule}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Accept Reschedule
              </button>
            </div>
          )}

          {!userClient && (
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Reschedule Acceptance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to accept this reschedule proposal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsConfirmModalOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmAccept} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default RemarkModal;
