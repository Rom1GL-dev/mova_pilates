/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,userId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "public"."StatusType" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "expiredAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_sessionId_userId_key" ON "public"."Reservation"("sessionId", "userId");
