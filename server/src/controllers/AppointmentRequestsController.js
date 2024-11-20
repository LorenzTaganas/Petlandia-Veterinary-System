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

  if (!petDetails || !petDetails.name || !petDetails.type) {
    return res
      .status(400)
      .json({ error: "Pet details are incomplete or missing." });
  }

  const age = Number(petDetails.age);
  const weight = Number(petDetails.weight);

  if (isNaN(age) || isNaN(weight)) {
    return res.status(400).json({ error: "Pet age or weight is invalid." });
  }

  try {
    const pet = await prisma.pet.create({
      data: {
        name: petDetails.name,
        type: petDetails.type,
        breed: petDetails.breed,
        age,
        weight,
        ownerId: req.user.id,
      },
    });

    const appointmentRequest = await prisma.appointmentRequest.create({
      data: {
        appointmentDate: new Date(appointmentDate),
        appointmentType,
        preferredVetId: parseInt(preferredVetId),
        petId: pet.id,
        ownerId: req.user.id,
        reason,
        additionalComments,
      },
      include: {
        pet: true,
        owner: true,
        preferredVet: true,
      },
    });

    return res.status(201).json(appointmentRequest);
  } catch (error) {
    console.error("Error creating appointment request:", error);
    return res
      .status(500)
      .json({ error: "Failed to create appointment request." });
  }
};

exports.getAllAppointmentRequests = async (req, res) => {
  try {
    const appointmentRequests = await prisma.appointmentRequest.findMany({
      where: {
        status: {
          not: "Approved",
        },
      },
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

  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  try {
    const appointmentRequest = await prisma.appointmentRequest.update({
      where: { id: parseInt(id) },
      data: {
        status: "Approved",
        remark,
        adminId: req.user.id,
        approvedBy: req.user.id,
        assignedVetId: parseInt(assignedVetId),
        approvedAt: new Date(),
      },
    });

    res.status(200).json(appointmentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept appointment request." });
  }
};

exports.declineAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  const { remark, rescheduleDate, assignedVetId } = req.body;

  try {
    const validRescheduleDate = rescheduleDate
      ? new Date(rescheduleDate)
      : null;
    const declinedAt = new Date();

    if (rescheduleDate && isNaN(validRescheduleDate)) {
      return res.status(400).json({ error: "Invalid reschedule date." });
    }

    const appointmentRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        status: "Declined",
        remark,
        rescheduleDate: validRescheduleDate,
        declinedAt,
        declinedBy: req.user.id,
        adminId: req.user.id,
        assignedVetId: parseInt(assignedVetId),
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
    reason,
    additionalComments,
    pet,
  } = req.body;

  try {
    const updatedRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: {
        appointmentDate,
        appointmentType,
        preferredVetId,
        reason,
        additionalComments,
        status: req.body.status || "Pending",
      },
    });

    if (pet && pet.id) {
      await prisma.pet.update({
        where: { id: pet.id },
        data: {
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: parseInt(pet.age, 10),
          weight: parseFloat(pet.weight),
        },
      });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to edit appointment request." });
  }
};

exports.deleteAppointmentRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.appointmentRequest.delete({
      where: { id: Number(id) },
    });
    const updatedAppointmentRequests = await prisma.appointmentRequest.findMany(
      {
        include: {
          pet: true,
          owner: true,
          preferredVet: true,
        },
      }
    );
    res.status(200).json(updatedAppointmentRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete appointment request." });
  }
};

exports.rescheduleAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  const { newAppointmentDate, remark, approve, assignedVetId } = req.body;

  try {
    const validNewAppointmentDate = new Date(newAppointmentDate);

    if (isNaN(validNewAppointmentDate)) {
      return res.status(400).json({ error: "Invalid new appointment date." });
    }

    const appointmentRequest = await prisma.appointmentRequest.findUnique({
      where: { id: Number(id) },
    });

    if (!appointmentRequest) {
      return res.status(404).json({ error: "Appointment request not found." });
    }

    const updatedData = {
      appointmentDate: validNewAppointmentDate,
      remark,
      approvedBy: appointmentRequest.declinedBy,
    };

    if (approve) {
      updatedData.status = "Approved";
      updatedData.approvedBy = appointmentRequest.declinedBy;
    }

    const updatedAppointmentRequest = await prisma.appointmentRequest.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    if (assignedVetId) {
      await prisma.appointmentRequest.update({
        where: { id: updatedAppointmentRequest.id },
        data: {
          assignedVetId: parseInt(assignedVetId),
          approvedAt: new Date(),
        },
      });
    }

    return res.status(200).json(updatedAppointmentRequest);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to reschedule appointment request." });
  }
};
