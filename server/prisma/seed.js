const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstName: "Admin",
        lastName: "Admin",
        email: "Admin@gmail.com",
        password:
          "$2a$10$zgX/v9omHQsZnWra78TQbezMhJPtpAdXGrSI7gMPiiZ27EOOHD2l.",
        contactNo: "1234567890",
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Staff",
        lastName: "Staff",
        email: "Staff@gmail.com",
        password:
          "$2a$10$alQ3HCF2iiAYT2gSOIJNxeeS.PwuUt6AXzIE83kXOLPukNeaoaRra",
        contactNo: "1234567891",
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Client",
        lastName: "Client",
        email: "Client@gmail.com",
        password:
          "$2a$10$OkwYf5Qq//i3Umvr2L4uw.nQH8AAl4wADZl.qWgasoXnMYvVwtILK",
        contactNo: "1234567892",
        role: "Client",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  await prisma.blacklist.create({
    data: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkNsaWVudCIsImlhdCI6MTczMTM3OTA4MywiZXhwIjoxNzMxMzc5OTgzfQ.b1nDjz95LWkQ04q-MPFXZArcUrY94jelMnsM3LJnKQs",
      loggedOutAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
