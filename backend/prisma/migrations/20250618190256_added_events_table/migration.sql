-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Eligibility" JSONB,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "EndTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "isTeamEvent" BOOLEAN NOT NULL,
    "TeamSize" INTEGER,
    "entryfees" INTEGER,
    "prize" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
