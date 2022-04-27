-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descrition" TEXT NOT NULL,
    "filename" TEXT NOT NULL DEFAULT E'pass',
    "order" INTEGER NOT NULL DEFAULT 99,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);
