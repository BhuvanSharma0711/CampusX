-- DropIndex
DROP INDEX "Foodshops_id_key";

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "Rollno" BIGINT NOT NULL,
    "Course" TEXT NOT NULL,
    "Branch" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "isVegetarian" BOOLEAN NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userid_key" ON "UserDetails"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_Rollno_key" ON "UserDetails"("Rollno");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
