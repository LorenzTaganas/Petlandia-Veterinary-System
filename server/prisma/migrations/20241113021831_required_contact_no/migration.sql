/*
  Warnings:

  - Made the column `contactNo` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `contactNo` VARCHAR(191) NOT NULL;
