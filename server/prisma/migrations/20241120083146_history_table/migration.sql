-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentRequestId` INTEGER NOT NULL,
    `dateAccomplished` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proceduresPerformed` VARCHAR(191) NOT NULL,
    `petConditionAfter` VARCHAR(191) NOT NULL,
    `recommendationsForOwner` VARCHAR(191) NULL,
    `veterinariansNotes` VARCHAR(191) NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ownerId` INTEGER NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `History_appointmentRequestId_key`(`appointmentRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_appointmentRequestId_fkey` FOREIGN KEY (`appointmentRequestId`) REFERENCES `AppointmentRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
