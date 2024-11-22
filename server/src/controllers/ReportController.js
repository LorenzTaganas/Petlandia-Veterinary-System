const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getReports = async (req, res) => {
  const { startDate, endDate } = req.query;
  const { user } = req;

  const dateFilter = {};
  if (startDate) dateFilter.gte = new Date(startDate);
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    dateFilter.lte = end;
  }

  const statusFilter = { status: "Successful" };

  try {
    const whereClause = {
      ...statusFilter,
      appointmentDate: dateFilter,
    };

    if (user.role === "Staff") {
      whereClause.assignedVetId = user.id;
    }

    const appointments = await prisma.appointmentRequest.findMany({
      where: whereClause,
      include: {
        owner: true,
        assignedVet: true,
        history: true,
      },
    });

    res.json({
      generatedBy: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      dateRange: { startDate, endDate },
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopClients = async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate) dateFilter.gte = new Date(startDate);
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    dateFilter.lte = end;
  }

  try {
    const whereClause = {
      role: "Client",
      appointmentRequests: {
        some: {
          status: "Successful",
          appointmentDate: dateFilter,
        },
      },
    };

    if (user.role === "Staff") {
      whereClause.appointmentRequests.some.assignedVetId = user.id;
    }

    const topClients = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        appointmentRequests: {
          where: {
            status: "Successful",
            appointmentDate: dateFilter,
          },
        },
      },
      orderBy: {
        appointmentRequests: {
          _count: "desc",
        },
      },
      take: 5,
    });

    res.json(topClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top clients", error });
  }
};

exports.getRevenueOverview = async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate) dateFilter.gte = new Date(startDate);
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    dateFilter.lte = end;
  }

  try {
    const whereClause = {
      paymentDate: dateFilter,
    };

    if (user.role === "Staff") {
      whereClause.appointmentRequest = {
        assignedVetId: user.id,
      };
    }

    const revenue = await prisma.history.groupBy({
      by: ["paymentDate"],
      _sum: {
        amount: true,
      },
      where: whereClause,
      orderBy: {
        paymentDate: "asc",
      },
    });

    const totalRevenue = revenue.reduce(
      (acc, entry) => acc + entry._sum.amount,
      0
    );

    res.json({ revenue, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: "Error fetching revenue overview", error });
  }
};

exports.getMostSelectedAppointmentTypes = async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate) dateFilter.gte = new Date(startDate);
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    dateFilter.lte = end;
  }

  try {
    const whereClause = {
      appointmentDate: dateFilter,
      status: "Successful",
    };

    if (user.role === "Staff") {
      whereClause.assignedVetId = user.id;
    }

    const appointmentTypes = await prisma.appointmentRequest.groupBy({
      by: ["appointmentType"],
      _count: {
        appointmentType: true,
      },
      where: whereClause,
      orderBy: {
        _count: {
          appointmentType: "desc",
        },
      },
      take: 5,
    });

    res.json({ appointmentTypes });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching most selected appointment types",
      error,
    });
  }
};

exports.getAssignedStaff = async (req, res) => {
  const { user } = req;

  try {
    const assignedStaff = await prisma.user.findMany({
      where: { role: "Staff" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        appointmentRequests: {
          where: {
            status: "Successful",
          },
        },
      },
      orderBy: {
        appointmentRequests: {
          _count: "desc",
        },
      },
      take: 5,
    });

    res.json(assignedStaff);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned staff", error });
  }
};

exports.getMostPreferredStaff = async (req, res) => {
  const { user } = req;

  try {
    const mostPreferredStaff = await prisma.user.findMany({
      where: { role: "Staff" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        preferredAppointments: {
          where: {
            status: "Successful",
          },
        },
      },
      orderBy: {
        preferredAppointments: {
          _count: "desc",
        },
      },
      take: 5,
    });

    res.json(mostPreferredStaff);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching most preferred staff",
      error,
    });
  }
};
