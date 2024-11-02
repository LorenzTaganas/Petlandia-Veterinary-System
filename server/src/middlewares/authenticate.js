const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const blacklistedToken = await prisma.blacklist.findUnique({
      where: { token },
    });

    if (blacklistedToken) {
      return res
        .status(403)
        .json({ message: "Forbidden: Token is blacklisted" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authenticate;
