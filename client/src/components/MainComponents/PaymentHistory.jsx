import React, { useEffect, useState } from "react";
import { getAllPaymentHistory } from "../../services/historyService";
import { getFullName, getUserProfile } from "../../services/userService";
import DateTimeDisplay from "../helpers/DateTimeDisplay";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const data = await getAllPaymentHistory();
      const enrichedData = await Promise.all(
        data.map(async (payment) => {
          const user = await getUserProfile(payment.ownerId);
          return { ...payment, owner: user };
        })
      );
      setPaymentHistory(enrichedData);
    } catch (error) {
      console.error("Error fetching payment history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
    fetchUserProfile();
  }, []);

  const filterPaymentHistory = () => {
    if (userProfile?.isAdmin) return paymentHistory;
    if (userProfile?.isClient) {
      return paymentHistory.filter(
        (payment) => payment.owner?.id === userProfile.id
      );
    }
    if (userProfile?.isStaff) {
      return paymentHistory.filter(
        (payment) =>
          payment.appointmentRequest?.assignedVet?.id === userProfile.id
      );
    }
    return [];
  };

  return (
    <div className="m-0">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin">Loading...</div>
        </div>
      ) : (
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
              {filterPaymentHistory().length === 0 ? (
                <tr className="bg-gray-100">
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-center text-lg font-semibold text-gray-500 rounded-l-lg rounded-r-lg"
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                filterPaymentHistory().map((payment, index) => (
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
      )}
    </div>
  );
};

export default PaymentHistory;
