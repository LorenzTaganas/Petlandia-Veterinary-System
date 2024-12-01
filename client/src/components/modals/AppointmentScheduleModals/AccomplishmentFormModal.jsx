import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import { AttachMoney, MedicalServices } from "@mui/icons-material";
import { createHistory } from "../../../services/historyService";

const AccomplishmentFormModal = ({
  open,
  onClose,
  refreshData,
  appointmentRequestId,
}) => {
  const [proceduresPerformed, setProceduresPerformed] = useState("");
  const [petConditionAfter, setPetConditionAfter] = useState("");
  const [recommendationsForOwner, setRecommendationsForOwner] = useState("");
  const [veterinariansNotes, setVeterinariansNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "proceduresPerformed":
        return value ? "" : "Procedures performed is required";
      case "petConditionAfter":
        return value ? "" : "Pet condition after procedure is required";
      case "paymentMethod":
        return value ? "" : "Payment method is required";
      case "amount":
        return value === ""
          ? "Amount is required"
          : /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
          ? ""
          : "Amount must be a valid number";
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
    const requiredFields = [
      "proceduresPerformed",
      "petConditionAfter",
      "paymentMethod",
      "amount",
    ];

    requiredFields.forEach((field) => {
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

  const handleSaveConfirm = async () => {
    const data = {
      appointmentRequestId,
      proceduresPerformed,
      petConditionAfter,
      recommendationsForOwner,
      veterinariansNotes,
      paymentTimestamp: new Date().toISOString(),
      paymentMethod,
      amount,
    };

    try {
      await createHistory(data);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error creating history", error);
    }
  };

  const handleClose = () => {
    setProceduresPerformed("");
    setPetConditionAfter("");
    setRecommendationsForOwner("");
    setVeterinariansNotes("");
    setPaymentMethod("");
    setAmount("");
    setErrors({});
    onClose();
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    handleClose();
    refreshData();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[45rem] h-[92vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Accomplishment Form
            </h2>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MedicalServices className="mr-2" /> Post-Appointment Details
                </h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Procedures Performed <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`w-full p-2 border rounded mb-1 ${
                      errors.proceduresPerformed ? "border-red-500" : ""
                    }`}
                    value={proceduresPerformed}
                    onChange={(e) => {
                      setProceduresPerformed(e.target.value);
                      handleValidation("proceduresPerformed", e.target.value);
                    }}
                    onBlur={(e) =>
                      handleValidation("proceduresPerformed", e.target.value)
                    }
                    placeholder="Describe the procedures performed"
                  />
                  {errors.proceduresPerformed && (
                    <p className="text-red-500 text-sm">
                      {errors.proceduresPerformed}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Pet Condition After The Procedure{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`w-full p-2 border rounded mb-1 ${
                      errors.petConditionAfter ? "border-red-500" : ""
                    }`}
                    value={petConditionAfter}
                    onChange={(e) => {
                      setPetConditionAfter(e.target.value);
                      handleValidation("petConditionAfter", e.target.value);
                    }}
                    onBlur={(e) =>
                      handleValidation("petConditionAfter", e.target.value)
                    }
                    placeholder="Describe the pet's condition after"
                  />
                  {errors.petConditionAfter && (
                    <p className="text-red-500 text-sm">
                      {errors.petConditionAfter}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Recommendations for Owner (Optional)
                  </label>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    value={recommendationsForOwner}
                    onChange={(e) => setRecommendationsForOwner(e.target.value)}
                    placeholder="Provide recommendations for the owner"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Veterinarian's Notes (Optional)
                  </label>
                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    value={veterinariansNotes}
                    onChange={(e) => setVeterinariansNotes(e.target.value)}
                    placeholder="Veterinarian's notes"
                  />
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="w-1/2">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AttachMoney className="mr-2" /> Payment Details
                </h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded mb-1 ${
                      errors.paymentMethod ? "border-red-500" : ""
                    }`}
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      handleValidation("paymentMethod", e.target.value);
                    }}
                    onBlur={(e) =>
                      handleValidation("paymentMethod", e.target.value)
                    }
                    placeholder="Enter payment method"
                  />
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-4 font-bold">
                      ₱
                    </span>
                    <input
                      type="text"
                      className={`w-full pl-8 py-2 border rounded mb-1 ${
                        errors.amount ? "border-red-500" : ""
                      }`}
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        handleValidation("amount", e.target.value);
                      }}
                      onBlur={(e) => handleValidation("amount", e.target.value)}
                      placeholder="Enter the amount"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-sm">{errors.amount}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
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
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Confirm Accomplishment Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit this accomplishment form?
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

      <Dialog open={isSuccessModalOpen} onClose={handleSuccessClose}>
        <DialogTitle
          sx={{
            color: "success.main",
          }}
        >
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accomplishment form submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccomplishmentFormModal;
