/*
  Warnings:

  - You are about to drop the column `barcode` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "barcode",
ADD COLUMN     "barcodes" TEXT[];
