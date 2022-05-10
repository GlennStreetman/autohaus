-- CreateTable
CREATE TABLE "sitesetup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "sitesetup_pkey" PRIMARY KEY ("id")
);
