/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sitesetup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sitesetup_name_key" ON "sitesetup"("name");
