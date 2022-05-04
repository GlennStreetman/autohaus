/*
  Warnings:

  - Added the required column `sectionheader` to the `servicesection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicesection" ADD COLUMN     "sectionheader" TEXT NOT NULL;
