/*
  Warnings:

  - You are about to drop the column `Eligibility` on the `Events` table. All the data in the column will be lost.
  - Added the required column `eligibilityId` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "Eligibility",
ADD COLUMN     "eligibilityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Eligibility" (
    "id" TEXT NOT NULL,
    "open" BOOLEAN DEFAULT true,
    "years" INTEGER[],
    "Course" TEXT[],
    "departments" TEXT[],
    "branch" TEXT[],
    "genders" TEXT[],

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_eligibilityId_fkey" FOREIGN KEY ("eligibilityId") REFERENCES "Eligibility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
