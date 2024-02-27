/*
  Warnings:

  - You are about to drop the column `barcodes` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `dimension` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `barcodes` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Package` table. All the data in the column will be lost.
  - Added the required column `barcode` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "barcodes",
DROP COLUMN "categoryId",
DROP COLUMN "code",
DROP COLUMN "color",
DROP COLUMN "description",
DROP COLUMN "dimension",
DROP COLUMN "material",
DROP COLUMN "minValue",
DROP COLUMN "name",
DROP COLUMN "photo",
DROP COLUMN "price",
DROP COLUMN "qty",
DROP COLUMN "weight",
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "barcodes",
DROP COLUMN "qty",
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "pkgCapacity" INTEGER NOT NULL,
    "photo" TEXT,
    "description" TEXT,
    "weight" TEXT,
    "color" TEXT,
    "dimension" TEXT,
    "size" TEXT,
    "material" TEXT,
    "minValue" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
