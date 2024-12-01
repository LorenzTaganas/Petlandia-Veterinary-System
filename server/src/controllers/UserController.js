const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid Credentials." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    const blacklistedToken = await prisma.blacklist.findUnique({
      where: { token: refreshToken },
    });
    if (blacklistedToken) {
      return res
        .status(403)
        .json({ message: "Refresh token has been blacklisted." });
    }

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res
      .status(200)
      .json({ message: "Access token refreshed successfully.", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, contactNo } = req.body;

  if (!firstName || !lastName || !email || !password || !contactNo) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

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

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        contactNo,
        role: "Client",
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user.", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({ message: "Invalid credentials." });

    if (!user.isActive)
      return res.status(403).json({ message: "Invalid credentials." });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.logout = async (req, res) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    try {
      await prisma.blacklist.create({ data: { token: accessToken } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error blacklisting token.", error });
    }
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully." });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect current password." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        contactNo: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, contactNo } = req.body;
  const id = req.user.id;

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

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
        email,
        contactNo,
      },
    });

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;
  const currentUserId = req.user.id;

  try {
    const users = await prisma.user.findMany({
      where: {
        role,
        id: {
          not: currentUserId,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
