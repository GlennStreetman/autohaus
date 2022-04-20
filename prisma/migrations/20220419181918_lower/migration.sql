/*
  Warnings:

  - You are about to drop the column `altDate` on the `servicerequests` table. All the data in the column will be lost.
  - You are about to drop the column `altTime` on the `servicerequests` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `servicerequests` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `servicerequests` table. All the data in the column will be lost.
  - You are about to drop the column `prefDate` on the `servicerequests` table. All the data in the column will be lost.
  - You are about to drop the column `prefTime` on the `servicerequests` table. All the data in the column will be lost.
  - Added the required column `altdate` to the `servicerequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alttime` to the `servicerequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `servicerequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `servicerequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefdate` to the `servicerequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preftime` to the `servicerequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicerequests" DROP COLUMN "altDate",
DROP COLUMN "altTime",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "prefDate",
DROP COLUMN "prefTime",
ADD COLUMN     "altdate" TEXT NOT NULL,
ADD COLUMN     "alttime" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "prefdate" TEXT NOT NULL,
ADD COLUMN     "preftime" TEXT NOT NULL;
