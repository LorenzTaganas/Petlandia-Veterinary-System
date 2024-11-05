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
      { expiresIn: "15m" }
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
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already exists." });
    }
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

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
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
