-- AlterTable
ALTER TABLE `appointmentrequest` ADD COLUMN `approvedAt` DATETIME(3) NULL,
    ADD COLUMN `approvedBy` INTEGER NULL,
    ADD COLUMN `declinedBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AppointmentRequest` ADD CONSTRAINT `AppointmentRequest_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentRequest` ADD CONSTRAINT `AppointmentRequest_declinedBy_fkey` FOREIGN KEY (`declinedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
