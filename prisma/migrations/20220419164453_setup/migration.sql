-- CreateTable
CREATE TABLE "servicerequests" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "prefDate" TEXT NOT NULL,
    "prefTime" TEXT NOT NULL,
    "altDate" TEXT NOT NULL,
    "altTime" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "modelyear" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "requestdate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "servicerequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" SERIAL NOT NULL,
    "targetdate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "holiday" TEXT NOT NULL,
    "daysclosed" TEXT NOT NULL,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state1" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "coverletter" TEXT NOT NULL,
    "submitdate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);
