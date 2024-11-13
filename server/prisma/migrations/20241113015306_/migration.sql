/*
  Warnings:

  - A unique constraint covering the columns `[contactNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_contactNo_key` ON `User`(`contactNo`);
