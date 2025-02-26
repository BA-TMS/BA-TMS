/*
  Warnings:

  - You are about to drop the column `addressAddOn` on the `Consignee` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Consignee` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `Consignee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shipper" DROP CONSTRAINT "Shipper_consigneeId_fkey";

-- DropIndex
DROP INDEX "Consignee_telephone_key";

-- AlterTable
ALTER TABLE "Consignee" DROP COLUMN "addressAddOn",
DROP COLUMN "telCountry",
ADD COLUMN     "addressField2" TEXT,
ADD COLUMN     "addressField3" TEXT,
ADD COLUMN     "appointments" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "intersections" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "recievingHours" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tollFree" TEXT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "telephone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_consigneeId_fkey" FOREIGN KEY ("consigneeId") REFERENCES "Consignee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consignee" ADD CONSTRAINT "Consignee_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
