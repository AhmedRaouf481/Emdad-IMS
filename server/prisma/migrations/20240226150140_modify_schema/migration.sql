/*
  Warnings:

  - You are about to drop the column `code` on the `Package` table. All the data in the column will be lost.
  - Added the required column `qty` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "barcodes" TEXT[],
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "code",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "capacity" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "AttributeEnum";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
