/*
  Warnings:

  - You are about to drop the column `super` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "super",
ADD COLUMN     "superUser" BOOLEAN;
