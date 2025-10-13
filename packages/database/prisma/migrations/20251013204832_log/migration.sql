/*
  Warnings:

  - Added the required column `typeCourse` to the `TypeCourse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CourseType" AS ENUM ('INDIVIDUAL', 'COLLECTIVE');

-- AlterTable
ALTER TABLE "public"."TypeCourse" ADD COLUMN     "typeCourse" "public"."CourseType" NOT NULL;
