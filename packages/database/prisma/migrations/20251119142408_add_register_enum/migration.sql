/*
  Warnings:

  - You are about to drop the column `typeCourse` on the `TypeCourse` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "LogType" ADD VALUE 'REGISTER';

-- AlterTable
ALTER TABLE "TypeCourse" DROP COLUMN "typeCourse";

-- DropEnum
DROP TYPE "public"."CourseType";
