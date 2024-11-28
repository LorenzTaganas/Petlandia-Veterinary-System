const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.toggleAccountStatus = async (req, res) => {
  const { id, isActive } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        isActive: !isActive,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.changeAccountPassword = async (req, res) => {
  const { id, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.createAdminAccount = async (req, res) => {
  const { firstName, lastName, email, contactNo, password } = req.body;

  if (!firstName || !lastName || !email || !contactNo || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const ExistingContactNo = await prisma.user.findFirst({
      where: { contactNo },
    });

    if (ExistingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        contactNo,
        password: hashedPassword,
        role: "Admin",
        isActive: true,
      },
    });

    res
      .status(201)
      .json({ message: "Admin account created successfully", data: newAdmin });
  } catch (error) {
    console.error("Error creating admin account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createClientAccount = async (req, res) => {
  const { firstName, lastName, email, contactNo, password } = req.body;

  if (!firstName || !lastName || !email || !contactNo || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const ExistingContactNo = await prisma.user.findFirst({
      where: { contactNo },
    });

    if (ExistingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        contactNo,
        password: hashedPassword,
        role: "Client",
        isActive: true,
      },
    });

    res
      .status(201)
      .json({ message: "Admin account created successfully", data: newAdmin });
  } catch (error) {
    console.error("Error creating admin account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createStaffAccount = async (req, res) => {
  const { firstName, lastName, email, contactNo, password } = req.body;

  if (!firstName || !lastName || !email || !contactNo || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const ExistingContactNo = await prisma.user.findFirst({
      where: { contactNo },
    });

    if (ExistingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        contactNo,
        password: hashedPassword,
        role: "Staff",
        isActive: true,
      },
    });

    res
      .status(201)
      .json({ message: "Admin account created successfully", data: newAdmin });
  } catch (error) {
    console.error("Error creating admin account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAccountProfile = async (req, res) => {
  const { id, firstName, lastName, email, contactNo } = req.body;

  if (!firstName || !lastName || !email || !contactNo) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: id },
      },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken." });
    }

    const existingContactNo = await prisma.user.findFirst({
      where: {
        contactNo,
        NOT: { id: id },
      },
    });

    if (existingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number is already taken." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
        email,
        contactNo,
      },
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getAllUsersExceptSelf = async (req, res) => {
  const { id } = req.user;

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: { id: id },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNo: true,
        role: true,
        isActive: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.createUserWithRole = async (req, res) => {
  const { firstName, lastName, email, contactNo, password, role } = req.body;
  if (!firstName || !lastName || !email || !contactNo || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!["Admin", "Staff", "Client"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  try {
    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const existingContactNo = await prisma.user.findFirst({
      where: { contactNo },
    });
    if (existingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        contactNo,
        password: hashedPassword,
        role,
        isActive: true,
      },
    });

    res.status(201).json({
      message: "User account created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.updateUserWithRole = async (req, res) => {
  const { id, firstName, lastName, email, contactNo, role, isActive } =
    req.body;

  if (!id || !firstName || !lastName || !email || !contactNo || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!["Admin", "Staff", "Client"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email, NOT: { id } },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const existingContactNo = await prisma.user.findFirst({
      where: { contactNo, NOT: { id } },
    });
    if (existingContactNo) {
      return res
        .status(400)
        .json({ message: "Contact number already exists." });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        contactNo,
        role,
        isActive,
      },
    });

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error });
  }
};
