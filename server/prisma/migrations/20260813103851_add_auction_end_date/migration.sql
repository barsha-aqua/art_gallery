/*
  Warnings:

  - Added the required column `endsAt` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "currentHighestEmail" TEXT,
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "winnerNotified" BOOLEAN NOT NULL DEFAULT false;
