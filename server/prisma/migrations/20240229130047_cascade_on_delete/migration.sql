-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_productId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
