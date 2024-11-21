import React, { useState } from "react";
import { Divider } from "@mui/material";
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

  const handleSubmit = async () => {
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
      const result = await createHistory(data);
      handleClose();
      refreshData();
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
    onClose();
  };

  return (
    open && (
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
                  className="w-full p-2 border rounded mb-4"
                  value={proceduresPerformed}
                  onChange={(e) => setProceduresPerformed(e.target.value)}
                  placeholder="Describe the procedures performed"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Pet Condition After The Procedure{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded mb-4"
                  value={petConditionAfter}
                  onChange={(e) => setPetConditionAfter(e.target.value)}
                  placeholder="Describe the pet's condition after"
                />
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
                  className="w-full p-2 border rounded mb-4"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="Enter payment method"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-5 font-bold">
                    ₱
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 py-2 border rounded mb-4"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter the amount"
                  />
                </div>
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
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AccomplishmentFormModal;
