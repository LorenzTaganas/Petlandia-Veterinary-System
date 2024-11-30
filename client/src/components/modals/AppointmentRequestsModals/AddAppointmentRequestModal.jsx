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

  const [errors, setErrors] = useState({});
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

    if (open) {
      fetchStaffMembers();
    }
  }, [open]);

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
      case "preferredVetId":
        return value ? "" : "Preferred veterinarian is required";
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
      "preferredVetId",
      "petName",
      "petType",
      "reason",
      "petAge",
      "petWeight",
    ];

    fields.forEach((field) => {
      const value = eval(field);
      const errorMessage = validateField(field, value);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleSaveConfirm = () => {
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

    onSave(newAppointment);
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
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
    setErrors({});
    onClose();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[32rem] h-[80vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">
              Add Appointment Request
            </h2>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Appointment Date & Time{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.appointmentDate ? "border-red-500" : ""
                  }`}
                  value={appointmentDate}
                  onChange={(e) => {
                    setAppointmentDate(e.target.value);
                    handleValidation("appointmentDate", e.target.value);
                  }}
                  onBlur={(e) =>
                    handleValidation("appointmentDate", e.target.value)
                  }
                />
                {errors.appointmentDate && (
                  <p className="text-red-500 text-sm">
                    {errors.appointmentDate}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.appointmentType ? "border-red-500" : ""
                  }`}
                  value={appointmentType}
                  onChange={(e) => {
                    setAppointmentType(e.target.value);
                    handleValidation("appointmentType", e.target.value);
                  }}
                  onBlur={(e) =>
                    handleValidation("appointmentType", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Type...
                  </option>
                  <option value="Checkup">Checkup</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Grooming">Grooming</option>
                </select>
                {errors.appointmentType && (
                  <p className="text-red-500 text-sm">
                    {errors.appointmentType}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Preferred Veterinarian <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.preferredVetId ? "border-red-500" : ""
                  }`}
                  value={preferredVetId}
                  onChange={(e) => {
                    setPreferredVetId(e.target.value);
                    handleValidation("preferredVetId", e.target.value);
                  }}
                  onBlur={(e) =>
                    handleValidation("preferredVetId", e.target.value)
                  }
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
                {errors.preferredVetId && (
                  <p className="text-red-500 text-sm">
                    {errors.preferredVetId}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Pet Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.petName ? "border-red-500" : ""
                  }`}
                  value={petName}
                  onChange={(e) => {
                    setPetName(e.target.value);
                    handleValidation("petName", e.target.value);
                  }}
                  onBlur={(e) => handleValidation("petName", e.target.value)}
                  placeholder="Pet Name"
                />
                {errors.petName && (
                  <p className="text-red-500 text-sm">{errors.petName}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Pet Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.petType ? "border-red-500" : ""
                  }`}
                  value={petType}
                  onChange={(e) => {
                    setPetType(e.target.value);
                    handleValidation("petType", e.target.value);
                  }}
                  onBlur={(e) => handleValidation("petType", e.target.value)}
                  placeholder="Pet Type"
                />
                {errors.petType && (
                  <p className="text-red-500 text-sm">{errors.petType}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Pet Breed (Optional)
                </label>
                <input
                  type="text"
                  className="w-full mb-1 p-2 border rounded"
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
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.petAge ? "border-red-500" : ""
                  }`}
                  value={petAge}
                  onChange={(e) => {
                    setPetAge(e.target.value);
                    handleValidation("petAge", e.target.value);
                  }}
                  onBlur={(e) => handleValidation("petAge", e.target.value)}
                  placeholder="Pet Age"
                />
                {errors.petAge && (
                  <p className="text-red-500 text-sm">{errors.petAge}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Pet Weight (Optional)
                </label>
                <input
                  type="text"
                  className={`w-full mb-1 p-2 border rounded ${
                    errors.petWeight ? "border-red-500" : ""
                  }`}
                  value={petWeight}
                  onChange={(e) => {
                    setPetWeight(e.target.value);
                    handleValidation("petWeight", e.target.value);
                  }}
                  onBlur={(e) => handleValidation("petWeight", e.target.value)}
                  placeholder="Pet Weight"
                />
                {errors.petWeight && (
                  <p className="text-red-500 text-sm">{errors.petWeight}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Reason for Appointment <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full mb-1 p-2 border rounded ${
                  errors.reason ? "border-red-500" : ""
                }`}
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  handleValidation("reason", e.target.value);
                }}
                onBlur={(e) => handleValidation("reason", e.target.value)}
                placeholder="Reason for Appointment"
              />
              {errors.reason && (
                <p className="text-red-500 text-sm">{errors.reason}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Additional Comments (Optional)
              </label>
              <textarea
                className="w-full mb-1 p-2 border rounded"
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
      )}

      <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Appointment Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit this appointment request?
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
        onClose={() => {
          setIsSuccessModalOpen(false);
          handleClose();
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
            Appointment request submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsSuccessModalOpen(false);
              handleClose();
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

export default AddAppointmentRequestModal;
