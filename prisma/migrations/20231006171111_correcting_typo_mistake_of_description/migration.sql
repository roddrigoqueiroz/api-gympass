/*
  Warnings:

  - You are about to drop the column `descirption` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "descirption",
ADD COLUMN     "description" TEXT;
