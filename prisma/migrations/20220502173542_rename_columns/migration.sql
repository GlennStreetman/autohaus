/*
  Warnings:

  - You are about to drop the column `roll` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "roll",
ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "team" DROP COLUMN "order",
ADD COLUMN     "orderBy" INTEGER NOT NULL DEFAULT 99;
