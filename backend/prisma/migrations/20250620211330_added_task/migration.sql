-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "Deadline" TIMESTAMP(3),
    "Finished" BOOLEAN NOT NULL,
    "Repeating" BOOLEAN NOT NULL,
    "RepeatedDays" TEXT[],

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
