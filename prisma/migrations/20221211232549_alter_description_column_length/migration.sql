/*
  Warnings:

  - You are about to alter the column `Description` on the `location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2048)` to `VarChar(1024)`.

*/
-- AlterTable
ALTER TABLE `location` MODIFY `Description` VARCHAR(1024) NULL;
