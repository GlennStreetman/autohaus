/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `holidays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicesection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sitesetup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "servicesection" DROP CONSTRAINT "servicesection_serviceid_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "faq";

-- DropTable
DROP TABLE "holidays";

-- DropTable
DROP TABLE "servicesection";

-- DropTable
DROP TABLE "sitesetup";

-- DropTable
DROP TABLE "team";
