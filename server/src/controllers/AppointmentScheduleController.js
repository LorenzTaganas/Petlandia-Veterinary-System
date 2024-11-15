const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAppointmentSchedule = async (req, res) => {
  try {
    const appointmentSchedules = await prisma.appointmentSchedule.findMany({
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
      },
    });
    res.status(200).json(appointmentSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment schedule." });
  }
};

exports.getAppointmentScheduleDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const appointmentSchedule = await prisma.appointmentSchedule.findUnique({
      where: { id: Number(id) },
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
      },
    });
    if (!appointmentSchedule) {
      return res.status(404).json({ error: "Appointment schedule not found." });
    }
    res.status(200).json(appointmentSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment schedule." });
  }
};

exports.editAppointmentSchedule = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, assignedVetId } = req.body;

  try {
    const updatedSchedule = await prisma.appointmentSchedule.update({
      where: { id: Number(id) },
      data: {
        appointmentDate,
        assignedVetId,
      },
    });
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to edit appointment schedule." });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const canceledAppointment = await prisma.appointmentSchedule.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Appointment canceled successfully",
      canceledAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel appointment." });
  }
};
