/*
  Warnings:

  - You are about to drop the column `status` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."StatusType";
