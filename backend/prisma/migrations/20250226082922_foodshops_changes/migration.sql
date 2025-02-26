/*
  Warnings:

  - You are about to drop the column `closedby` on the `Foodshops` table. All the data in the column will be lost.
  - Added the required column `deliveryby` to the `Foodshops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diningby` to the `Foodshops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Foodshops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foodshops" DROP COLUMN "closedby",
ADD COLUMN     "deliveryby" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diningby" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
