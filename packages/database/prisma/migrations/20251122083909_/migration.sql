/*
  Warnings:

  - Added the required column `status` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('CONFIRMED', 'CANCELLED', 'MISSING', 'PRESENT');

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "status" "public"."StatusType" NOT NULL;
