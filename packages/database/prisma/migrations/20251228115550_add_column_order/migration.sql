/*
  Warnings:

  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "status" "public"."PaymentStatus" NOT NULL;
