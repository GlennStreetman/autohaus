/*
  Warnings:

  - The primary key for the `sitesetup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sitesetup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sitesetup" DROP CONSTRAINT "sitesetup_pkey",
DROP COLUMN "id";
