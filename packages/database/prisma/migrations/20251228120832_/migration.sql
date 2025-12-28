/*
  Warnings:

  - A unique constraint covering the columns `[stripeIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeIntentId_key" ON "public"."Order"("stripeIntentId");
