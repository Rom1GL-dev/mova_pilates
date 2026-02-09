-- AlterTable
ALTER TABLE "public"."Pack" ADD COLUMN     "archivedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "archivedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."TypeCourse" ADD COLUMN     "archivedAt" TIMESTAMP(3);
