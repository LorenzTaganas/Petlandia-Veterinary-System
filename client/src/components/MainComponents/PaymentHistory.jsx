import React, { useEffect, useState } from "react";
import { getAllPaymentHistory } from "../../services/historyService";
import { getUserById } from "../../services/userService";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const data = await getAllPaymentHistory();
        console.log(data);
        for (let payment of data) {
          const user = await getUserById(payment.ownerId);
          payment.owner = user;
        }
        setPaymentHistory(data);
      } catch (error) {
        console.error("Error fetching payment history", error);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <>
      <h1>Payment History</h1>
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Contact No</th>
            <th>Payment Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((item) => (
            <tr key={item.id}>
              <td>
                {item.owner
                  ? `${item.owner.firstName} ${item.owner.lastName}`
                  : "N/A"}
              </td>
              <td>{item.owner ? item.owner.email : "N/A"}</td>
              <td>{item.owner ? item.owner.contactNo : "N/A"}</td>
              <td>{new Date(item.paymentDate).toLocaleString()}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaymentHistory;
