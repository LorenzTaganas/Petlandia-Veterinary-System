import React, { useEffect, useState } from "react";
import { getStaffRemarksById } from "../../../services/historyService";
import { formatDate } from "../../../utils/dateTimeUtil";

const ViewStaffRemarkModal = ({ appointmentId, isVisible, onClose }) => {
  const [staffRemarks, setStaffRemarks] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStaffRemarks = async () => {
    setLoading(true);
    try {
      const data = await getStaffRemarksById(appointmentId);
      setStaffRemarks(data);
    } catch (error) {
      console.error("Error fetching staff remarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appointmentId) {
      fetchStaffRemarks();
    }
  }, [appointmentId]);

  const renderTextField = (label, value) => {
    return (
      <div className="mb-4">
        <p className="font-semibold mb-1">{label}:</p>
        <textarea
          readOnly
          value={value || "(None)"}
          className={`w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm ${
            value ? "" : "text-gray-500"
          }`}
        ></textarea>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg w-[32rem] h-auto max-h-[90vh] overflow-auto shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Staff Remarks</h3>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin">Loading...</div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center">
              <p className="font-semibold mr-2">Date Accomplished:</p>
              <p className="text-sm">
                {formatDate(staffRemarks?.dateAccomplished).date +
                  " " +
                  formatDate(staffRemarks?.dateAccomplished).time}
              </p>
            </div>
            <div className="mb-4 flex items-center">
              <p className="font-semibold mr-2">Assigned Veterinarian:</p>
              <p className="text-sm">{staffRemarks?.assignedVet}</p>
            </div>
            {renderTextField(
              "Procedures Performed",
              staffRemarks?.proceduresPerformed
            )}
            {renderTextField(
              "Pet Condition After",
              staffRemarks?.petConditionAfter
            )}
            {renderTextField(
              "Recommendations for Owner",
              staffRemarks?.recommendationsForOwner
            )}
            {renderTextField(
              "Veterinarian Notes",
              staffRemarks?.veterinariansNotes
            )}

            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewStaffRemarkModal;
