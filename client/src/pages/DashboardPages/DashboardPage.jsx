import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import MainSidebar from "../../components/NavigationComponents/MainSidebar";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard");
        setData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching data"
        );
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="flex">
      <MainSidebar />
      <div className="flex-1 p-8">
        <h1>Dashboard Landing Page</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && <p>{data.message}</p>}
        {data && (
          <p>
            User: {data.user.id}, Role: {data.user.role}
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
