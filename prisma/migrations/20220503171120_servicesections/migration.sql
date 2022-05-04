-- CreateTable
CREATE TABLE "servicesection" (
    "id" SERIAL NOT NULL,
    "sectionimage" TEXT,
    "sectiontext" TEXT NOT NULL,
    "serviceid" INTEGER NOT NULL,

    CONSTRAINT "servicesection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servicesection" ADD CONSTRAINT "servicesection_serviceid_fkey" FOREIGN KEY ("serviceid") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
