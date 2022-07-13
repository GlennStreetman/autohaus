/*
  Warnings:

  - Added the required column `vin` to the `servicerequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicerequests" ADD COLUMN     "vin" TEXT NOT NULL;
