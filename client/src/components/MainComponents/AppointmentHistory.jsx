import React, { useEffect, useState } from "react";
import { getAllPostAppointmentDetails } from "../../services/historyService";

const AppointmentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getAllPostAppointmentDetails();
        console.log(data);
        setHistory(data);
      } catch (error) {
        console.error("Error fetching appointment history", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <h1>Appointment History</h1>
      <table>
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Appointment Date</th>
            <th>Date Accomplished</th>
            <th>Procedures Performed</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.petName}</td>
              <td>{new Date(item.appointmentDate).toLocaleString()}</td>{" "}
              <td>{new Date(item.dateAccomplished).toLocaleString()}</td>{" "}
              <td>{item.proceduresPerformed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AppointmentHistory;
