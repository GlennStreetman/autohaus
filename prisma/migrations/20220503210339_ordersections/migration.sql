-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "ordernumber" INTEGER NOT NULL DEFAULT 99;

-- AlterTable
ALTER TABLE "servicesection" ADD COLUMN     "ordernumber" INTEGER NOT NULL DEFAULT 99;
