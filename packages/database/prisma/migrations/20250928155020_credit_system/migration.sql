/*
  Warnings:

  - You are about to drop the column `credit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TypeCredit` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "credit";

-- DropTable
DROP TABLE "public"."TypeCredit";

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "typeCourseId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_typeCourseId_key" ON "public"."Wallet"("userId", "typeCourseId");

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_typeCourseId_fkey" FOREIGN KEY ("typeCourseId") REFERENCES "public"."TypeCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
