/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barcode]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_barcode_key" ON "Item"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Package_barcode_key" ON "Package"("barcode");
