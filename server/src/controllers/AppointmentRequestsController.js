const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAppointmentRequest = async (req, res) => {
  const {
    appointmentDate,
    appointmentType,
    preferredVetId,
    petDetails,
    reason,
    additionalComments,
  } = req.body;

  try {
    const newPet = await prisma.pet.create({
      data: {
        name: petDetails.name,
        type: petDetails.type,
        breed: petDetails.breed || null,
        age: petDetails.age || null,
        weight: petDetails.weight || null,
        ownerId: req.user.id,
      },
    });

    const newAppointmentRequest = await prisma.appointmentRequest.create({
      data: {
        appointmentDate,
        appointmentType,
        preferredVetId,
        petId: newPet.id,
        reason,
        additionalComments,
        status: "Pending",
      },
    });

    res.status(201).json(newAppointmentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment request." });
  }
};

exports.getAllAppointmentRequests = async (req, res) => {
  try {
    const appointmentRequests = await prisma.appointmentRequest.findMany({
      include: {
        pet: true,
        owner: true,
        preferredVet: true,
      },
    });
    res.status(200).json(appointmentRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment requests." });
  }
};

exports.getAppointmentRequestDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const appointmentRequest = await prisma.appointmentRequest.findUnique({
      where: { id: Number(id) },
      include: {
        pet: true,
        owner: true,
        preferredVet: true,
      },
    });
    if (!appointmentRequest) {
      return res.status(404).json({ error: "Appointment request not found." });
    }
    res.status(200).json(appointmentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment request." });
  }
};

exports.acceptAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  const { assignedVetId, remark } = req.body;

  try {
    const appointmentRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        status: "Accepted",
        remark,
        adminId: req.user.id,
      },
    });

    const appointmentSchedule = await prisma.appointmentSchedule.create({
      data: {
        appointmentDate: appointmentRequest.appointmentDate,
        appointmentType: appointmentRequest.appointmentType,
        assignedVetId,
        petId: appointmentRequest.petId,
        ownerId: appointmentRequest.ownerId,
        approvedAt: new Date(),
      },
    });

    res.status(200).json({ appointmentRequest, appointmentSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept appointment request." });
  }
};

exports.declineAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  const { remark, rescheduleDate } = req.body;

  try {
    const appointmentRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        status: "Declined",
        remark,
        rescheduleDate: rescheduleDate || null,
        declinedAt: new Date(),
        adminId: req.user.id,
      },
    });

    res.status(200).json(appointmentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to decline appointment request." });
  }
};

exports.editAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  const {
    appointmentDate,
    appointmentType,
    preferredVetId,
    petId,
    reason,
    additionalComments,
  } = req.body;

  try {
    const updatedRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        appointmentDate,
        appointmentType,
        preferredVetId,
        petId,
        reason,
        additionalComments,
      },
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to edit appointment request." });
  }
};

exports.deleteAppointmentRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointmentRequest = await prisma.appointmentRequest.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Appointment request deleted successfully",
      deletedAppointmentRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete appointment request." });
  }
};