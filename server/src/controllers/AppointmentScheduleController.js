const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAppointmentSchedule = async (req, res) => {
  try {
    const appointmentSchedules = await prisma.appointmentSchedule.findMany({
      where: {
        pet: {
          appointmentRequests: {
            some: {
              status: "Approved", // Filter by approved appointment requests
            },
          },
        },
      },
      include: {
        pet: true,
        owner: true,
        assignedVet: true,
        pet: {
          include: {
            appointmentRequests: {
              where: {
                status: "Approved", // Filter by the approved request
              },
              select: {
                remark: true, // Include the remark field from AppointmentRequest
              },
            },
          },
        },
      },
    });

    // Map the remark from the appointmentRequests relation into the appointmentSchedule object
    const result = appointmentSchedules.map((schedule) => {
      // Fetch the remark from the first approved appointment request related to this pet
      const remark =
        schedule.pet.appointmentRequests.length > 0
          ? schedule.pet.appointmentRequests[0].remark
          : null;
      return { ...schedule, remark };
    });

    res.status(200).json(result);
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
        pet: {
          include: {
            appointmentRequests: {
              where: {
                status: "Approved",
              },
              select: {
                remark: true,
              },
            },
          },
        },
      },
    });

    if (!appointmentSchedule) {
      return res.status(404).json({ error: "Appointment schedule not found." });
    }

    // Extract remark
    const remark =
      appointmentSchedule.pet.appointmentRequests.length > 0
        ? appointmentSchedule.pet.appointmentRequests[0].remark
        : null;

    // Include the remark in the result
    res.status(200).json({ ...appointmentSchedule, remark });
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
