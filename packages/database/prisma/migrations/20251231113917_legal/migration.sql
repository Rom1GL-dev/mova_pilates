-- CreateEnum
CREATE TYPE "public"."LegalType" AS ENUM ('POLITIQUE_DE_CONFIDENTIALITE', 'CONDITIONS_D_UTILISATION', 'CONDITIONS_DE_VENTE', 'MENTIONS_LEGALES');

-- CreateTable
CREATE TABLE "public"."LegalDocument" (
    "id" TEXT NOT NULL,
    "type" "public"."LegalType" NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_type_key" ON "public"."LegalDocument"("type");
