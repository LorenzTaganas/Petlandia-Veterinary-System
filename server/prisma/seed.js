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
        role: "Staff",
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

  const buddy = await prisma.pet.create({
    data: {
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: 3,
      weight: 25.5,
      ownerId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const mittens = await prisma.pet.create({
    data: {
      name: "Mittens",
      type: "Cat",
      breed: "Siamese",
      age: 2,
      weight: 4.3,
      ownerId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const max = await prisma.pet.create({
    data: {
      name: "Max",
      type: "Dog",
      breed: "Bulldog",
      age: 4,
      weight: 30.0,
      ownerId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.appointmentRequest.createMany({
    data: [
      {
        appointmentDate: new Date("2024-11-15T15:30:00.000Z"),
        appointmentType: "Checkup",
        preferredVetId: 2,
        petId: buddy.id,
        ownerId: 3,
        reason: "Routine checkup",
        additionalComments: "No additional comments.",
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        appointmentDate: new Date("2024-11-16T10:00:00.000Z"),
        appointmentType: "Treatment",
        preferredVetId: 2,
        petId: mittens.id,
        ownerId: 3,
        reason: "Vomiting for 2 days",
        additionalComments: "Concern about dehydration.",
        status: "Approved",
        remark: "Approved for treatment. Please monitor the hydration.",
        approvedAt: new Date(),
        approvedBy: 2,
        assignedVetId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        appointmentDate: new Date("2024-11-17T10:00:00.000Z"),
        appointmentType: "Grooming",
        preferredVetId: 2,
        petId: max.id,
        ownerId: 3,
        reason: "Routine grooming",
        additionalComments: "Needs to be trimmed.",
        status: "Declined",
        remark: "Declined due to unavailable slots. Please reschedule.",
        declinedAt: new Date(),
        declinedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
