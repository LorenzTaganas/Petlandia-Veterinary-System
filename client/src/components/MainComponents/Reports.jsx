import React, { useState, useEffect } from "react";
import {
  getReports,
  getTopClients,
  getAssignedStaff,
  getRevenueOverview,
  getMostSelectedAppointmentTypes,
} from "../../services/reportService";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getUserProfile, getFullName } from "../../services/userService";
import "../modals/ReportModals/ReportsPrintStyle.css";
import { formatDateForDisplay } from "../../utils/dateTimeUtil";

const Reports = () => {
  const currentYear = new Date().getFullYear();

  const defaultStartDate = `${currentYear}-01-01`;
  const defaultEndDate = `${currentYear}-12-31`;

  const [reports, setReports] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [assignedStaff, setAssignedStaff] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [successfulAppointmentsCount, setSuccessfulAppointmentsCount] =
    useState(0);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [generatedBy, setGeneratedBy] = useState("");
  const [loading, setLoading] = useState(true);

  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const data = await getRevenueOverview(startDate, endDate);
        setRevenue(data.revenue);
        setTotalRevenue(data.totalRevenue);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching revenue overview:", error);
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [startDate, endDate]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          reportsData,
          topClientsData,
          assignedStaffData,
          revenueData,
          appointmentTypesData,
          userData,
        ] = await Promise.all([
          getReports(startDate, endDate),
          getTopClients(startDate, endDate),
          getAssignedStaff(startDate, endDate),
          getRevenueOverview(startDate, endDate),
          getMostSelectedAppointmentTypes(startDate, endDate),
          getUserProfile(),
        ]);
        setReports(reportsData.appointments);
        setTopClients(topClientsData);
        setAssignedStaff(assignedStaffData);
        setRevenue(revenueData.revenue);
        setAppointmentTypes(appointmentTypesData.appointmentTypes);
        setGeneratedBy(getFullName(userData));
        setSuccessfulAppointmentsCount(reportsData.successfulAppointmentsCount);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const topClientsData = Array.isArray(topClients)
    ? topClients.map((client, index) => {
        return {
          name: getFullName(client),
          value: client.appointmentRequests.length,
          color: colors[index % colors.length],
        };
      })
    : [];

  const appointmentTypesData = Array.isArray(appointmentTypes)
    ? appointmentTypes.map((appointment, index) => ({
        name: appointment.appointmentType,
        value: appointment._count.appointmentType,
        color: colors[index % colors.length],
      }))
    : [];

  return (
    <div className="p-5">
      <div id="print-content">
        <h1 className="text-2xl font-bold mb-4">Appointment Reports</h1>
        <div id="generated-info">
          <p>Generated by: {generatedBy}</p>
          <p className="mb-6">
            Date Range: {startDate} to {endDate}
          </p>
        </div>

        <div className="mb-6 no-print">
          <p className="font-semibold">Filter by Date Range</p>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 rounded"
            />
            <span className="text-lg">to</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 rounded"
            />
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Print Report
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-2xl">
            Total Successful Appointments: {successfulAppointmentsCount}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="col-span-1">
            <h2 className="font-semibold text-2xl mb-2 text-center">
              Top Clients
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                {topClientsData.length > 0 ? (
                  <>
                    <Pie
                      data={topClientsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) =>
                        `${name}: ${value} (${(
                          (value /
                            topClientsData.reduce(
                              (acc, client) => acc + client.value,
                              0
                            )) *
                          100
                        ).toFixed(1)}%)`
                      }
                      labelLine={false}
                    >
                      {topClientsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `${name}: ${value}`,
                        `Percentage: ${(
                          (value /
                            topClientsData.reduce(
                              (acc, client) => acc + client.value,
                              0
                            )) *
                          100
                        ).toFixed(1)}%`,
                      ]}
                    />
                    <Legend />
                  </>
                ) : (
                  <p>No top clients data available</p>
                )}
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1">
            <h2 className="font-semibold text-2xl mb-2 text-center">
              Most Selected Appointment Types
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentTypesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) =>
                    `${name}: ${value} (${(
                      (value /
                        appointmentTypesData.reduce(
                          (acc, type) => acc + type.value,
                          0
                        )) *
                      100
                    ).toFixed(1)}%)`
                  }
                  labelLine={false}
                >
                  {appointmentTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${name}: ${value}`,
                    `Percentage: ${(
                      (value /
                        appointmentTypesData.reduce(
                          (acc, type) => acc + type.value,
                          0
                        )) *
                      100
                    ).toFixed(1)}%`,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-2xl mb-2">Revenue Overview</h2>
          <div className="text-lg font-semibold mb-4">
            <strong>Total Revenue: </strong>₱{totalRevenue.toFixed(2)}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={revenue.map((entry) => ({
                paymentDate: new Date(entry.paymentDate).toLocaleDateString(),
                totalRevenue: entry._sum.amount,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentDate" />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => [
                  `₱${value.toLocaleString()}`,
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-2xl mb-2">Appointment Reports</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Appointment Date</th>
                <th className="px-4 py-2 border">Appointment Type</th>
                <th className="px-4 py-2 border">Client Name</th>
                <th className="px-4 py-2 border">Assigned Staff</th>
                <th className="px-4 py-2 border">Payment Method</th>
                <th className="px-4 py-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-2 border">
                    {formatDateForDisplay(report.appointmentDate)}
                  </td>
                  <td className="px-4 py-2 border">{report.appointmentType}</td>
                  <td className="px-4 py-2 border">
                    {getFullName(report.owner)}
                  </td>
                  <td className="px-4 py-2 border">
                    {report.assignedVet ? (
                      getFullName(report.assignedVet)
                    ) : (
                      <span className="text-gray-500">(N/A)</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {report.history ? (
                      report.history.paymentMethod
                    ) : (
                      <span className="text-gray-500">(N/A)</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {report.history && report.history.amount ? (
                      <>
                        <strong>₱</strong> {report.history.amount}
                      </>
                    ) : (
                      <span className="text-gray-500">(N/A)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
