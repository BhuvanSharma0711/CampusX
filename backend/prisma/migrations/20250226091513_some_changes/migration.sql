/*
  Warnings:

  - The `openby` column on the `Foodshops` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deliveryby` column on the `Foodshops` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `diningby` column on the `Foodshops` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Foodshops" DROP COLUMN "openby",
ADD COLUMN     "openby" TIME,
DROP COLUMN "deliveryby",
ADD COLUMN     "deliveryby" TIME,
DROP COLUMN "diningby",
ADD COLUMN     "diningby" TIME;
