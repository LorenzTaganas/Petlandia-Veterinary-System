import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching data"
        );
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      setData(null);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error logging out");
    }
  };

  return (
    <>
      <h1>Dashboard Landing Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p>{data.message}</p>}
      {data && (
        <p>
          User: {data.user.id}, Role: {data.user.role}
        </p>
      )}
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </>
  );
};

export default DashboardPage;
