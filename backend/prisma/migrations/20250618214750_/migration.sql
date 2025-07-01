/*
  Warnings:

  - Added the required column `Year` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "Year" INTEGER NOT NULL;
