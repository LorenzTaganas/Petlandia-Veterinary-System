const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAppointmentSchedule = async (req, res) => {
  try {
    const appointmentRequests = await prisma.appointmentRequest.findMany({
      where: { status: "Approved" },
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
      },
    });
    res.status(200).json(appointmentRequests);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve appointment schedules." });
  }
};

exports.getAppointmentScheduleDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const appointmentRequest = await prisma.appointmentRequest.findUnique({
      where: { id: Number(id) },
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
      },
    });

    if (!appointmentRequest) {
      return res.status(404).json({ error: "Appointment request not found." });
    }

    res.status(200).json(appointmentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment schedule." });
  }
};

exports.editAppointmentSchedule = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, assignedVetId } = req.body;

  try {
    const updatedRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        appointmentDate,
        assignedVetId,
      },
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to edit appointment schedule." });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const canceledRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: { status: "Cancelled" },
    });
    res.status(200).json({
      message: "Appointment canceled successfully",
      canceledRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel appointment." });
  }
};
