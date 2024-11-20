import React, { useEffect, useState } from "react";
import { getAllAppointmentRequests } from "../../services/appointmentRequestService";
import { getAppointmentSchedules } from "../../services/appointmentScheduleService";
import { getUserProfile } from "../../services/userService";
import placeholderImage from "../../assets/placeholder.png";

const Dashboard = ({ setActiveComponent }) => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [appointmentSchedules, setAppointmentSchedules] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await getAllAppointmentRequests();
        const schedulesData = await getAppointmentSchedules();
        const profileData = await getUserProfile();

        setAppointmentRequests(requestsData);
        setAppointmentSchedules(schedulesData);
        setUserProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { role, id: userId } = userProfile;

  const filteredRequests =
    role === "Client"
      ? appointmentRequests.filter(
          (request) =>
            request.ownerId === userId && request.status === "Pending"
        )
      : appointmentRequests.filter((request) => request.status === "Pending");

  const filteredSchedules =
    role === "Staff"
      ? appointmentSchedules.filter(
          (schedule) =>
            schedule.assignedVetId === userId && schedule.status === "Approved"
        )
      : appointmentSchedules.filter(
          (schedule) => schedule.status === "Approved"
        );

  const handleItemClick = (label) => {
    setActiveComponent(label);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to Dashboard
        </h1>
        <div className="flex justify-center gap-8">
          {role !== "Staff" && (
            <div className="bg-violet-300 p-6 rounded-lg shadow-lg w-full max-w-xs">
              <img
                src={placeholderImage}
                alt="Appointment Request"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">Appointment Requests</h2>
              <p className="text-3xl font-bold">
                <span className="mr-1">Count:</span>
                {filteredRequests.length}
              </p>

              <button
                onClick={() => handleItemClick("AppointmentRequests")}
                className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View
              </button>
            </div>
          )}

          <div className="bg-violet-300 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <img
              src={placeholderImage}
              alt="Appointment Schedule"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">Appointment Schedules</h2>
            <p className="text-3xl font-bold">
              <span className="mr-1">Count:</span>
              {filteredSchedules.length}
            </p>
            <button
              onClick={() => handleItemClick("AppointmentSchedule")}
              className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
