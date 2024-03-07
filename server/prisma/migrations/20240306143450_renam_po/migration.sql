/*
  Warnings:

  - You are about to drop the column `PurchasingNum` on the `Order` table. All the data in the column will be lost.
  - Added the required column `purchasingNum` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "PurchasingNum",
ADD COLUMN     "purchasingNum" TEXT NOT NULL;
