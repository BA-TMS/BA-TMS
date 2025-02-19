/*
  Warnings:

  - You are about to drop the column `addressAddOn` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Shipper` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[consigneeId]` on the table `Shipper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `Shipper` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Shipper_telephone_key";

-- AlterTable
ALTER TABLE "Shipper" DROP COLUMN "addressAddOn",
DROP COLUMN "telCountry",
ADD COLUMN     "addressField2" TEXT,
ADD COLUMN     "addressField3" TEXT,
ADD COLUMN     "appointments" TEXT,
ADD COLUMN     "consigneeId" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "intersections" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "shippingHours" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tollFree" TEXT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "telephone" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_consigneeId_key" ON "Shipper"("consigneeId");

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_consigneeId_fkey" FOREIGN KEY ("consigneeId") REFERENCES "Consignee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
