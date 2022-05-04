/*
  Warnings:

  - You are about to drop the column `orderBy` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "orderBy",
ADD COLUMN     "ordernumber" INTEGER NOT NULL DEFAULT 99;
