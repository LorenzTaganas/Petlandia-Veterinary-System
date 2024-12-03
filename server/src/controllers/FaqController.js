const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFAQs = async (req, res) => {
  const faqs = await prisma.fAQ.findMany();
  res.json(faqs);
};

const getFAQById = async (req, res) => {
  const { id } = req.params;
  const faq = await prisma.fAQ.findUnique({ where: { id: parseInt(id) } });
  res.json(faq);
};

const createFAQ = async (req, res) => {
  const { question, answer } = req.body;
  const newFAQ = await prisma.fAQ.create({ data: { question, answer } });
  res.json(newFAQ);
};

const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const updatedFAQ = await prisma.fAQ.update({
    where: { id: parseInt(id) },
    data: { question, answer },
  });
  res.json(updatedFAQ);
};

const deleteFAQ = async (req, res) => {
  const { id } = req.params;
  await prisma.fAQ.delete({ where: { id: parseInt(id) } });
  res.json({ message: "FAQ deleted" });
};

module.exports = {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
