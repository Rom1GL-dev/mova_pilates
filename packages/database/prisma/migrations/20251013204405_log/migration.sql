/*
  Warnings:

  - You are about to drop the column `typeCourse` on the `TypeCourse` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AppType" AS ENUM ('ADMIN', 'MOBILE');

-- CreateEnum
CREATE TYPE "public"."LogType" AS ENUM ('ADD', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PAYMENT', 'PASSWORD_RESET', 'RESERVATION', 'CANCELLATION', 'OTHER');

-- AlterTable
ALTER TABLE "public"."TypeCourse" DROP COLUMN "typeCourse";

-- DropEnum
DROP TYPE "public"."CourseType";

-- CreateTable
CREATE TABLE "public"."Log" (
    "id" TEXT NOT NULL,
    "appType" "public"."AppType" NOT NULL,
    "logType" "public"."LogType" NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
