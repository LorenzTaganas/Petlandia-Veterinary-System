import React, { useEffect, useState } from "react";
import { getAllPaymentHistory } from "../../services/historyService";
import { getFullName, getUserProfile } from "../../services/userService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const data = await getAllPaymentHistory();
      for (let payment of data) {
        const user = await getUserProfile(payment.ownerId);
        payment.owner = user;
      }
      setPaymentHistory(data);
    } catch (error) {
      console.error("Error fetching payment history", error);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
    fetchUserProfile();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-blue-500 text-white rounded-lg shadow-md">
              {!userProfile?.isClient && (
                <th className="px-4 py-3 rounded-l-lg">Owner Name</th>
              )}
              {userProfile?.isClient ? (
                <th className="px-4 py-3 rounded-l-lg">Payment Date</th>
              ) : (
                <th className="px-4 py-3">Payment Date</th>
              )}
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Contact No</th>
              <th className="px-4 py-3">Assigned Vet</th>
              <th className="px-4 py-3 rounded-r-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.length === 0 ? (
              <tr className="bg-gray-100">
                <td
                  colSpan="6"
                  className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                >
                  No Data Available
                </td>
              </tr>
            ) : (
              paymentHistory.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } shadow-md`}
                >
                  {!userProfile?.isClient && (
                    <td className="px-4 py-3 text-center rounded-l-lg">
                      {payment.owner ? getFullName(payment.owner) : "N/A"}
                    </td>
                  )}
                  {userProfile?.isClient ? (
                    <td className="px-4 py-3 text-center rounded-l-lg">
                      <DateTimeDisplay date={payment.paymentDate} />
                    </td>
                  ) : (
                    <td className="px-4 py-3 text-center">
                      <DateTimeDisplay date={payment.paymentDate} />
                    </td>
                  )}
                  <td className="px-4 py-3 text-center">
                    {payment.owner ? payment.owner.email : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {payment.owner ? payment.owner.contactNo : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {payment.appointmentRequest?.assignedVet
                      ? getFullName(payment.appointmentRequest.assignedVet)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center rounded-r-lg">
                    <strong>₱</strong> {payment.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
