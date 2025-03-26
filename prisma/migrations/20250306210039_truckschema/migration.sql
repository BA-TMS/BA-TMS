/*
  Warnings:

  - The `status` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `iftaLicensed` on the `Truck` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `Truck` table without a default value. This is not possible if the table is not empty.

*/


-- DropIndex
DROP INDEX "Truck_licensePlate_key";

-- AlterTable
ALTER TABLE "Truck" DROP COLUMN "iftaLicensed",
ADD COLUMN     "axels" TEXT,
ADD COLUMN     "deactivationDate" TIMESTAMP(3),
ADD COLUMN     "dotExpiry" TIMESTAMP(3),
ADD COLUMN     "fuelType" TEXT,
ADD COLUMN     "ifta" BOOLEAN,
ADD COLUMN     "mileage" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "ownership" TEXT,
ADD COLUMN     "registeredState" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "vin" TEXT,
ADD COLUMN     "weight" TEXT,
ADD COLUMN     "year" TEXT,
ALTER COLUMN "licensePlate" DROP NOT NULL,
ALTER COLUMN "plateExpiry" DROP NOT NULL,
ALTER COLUMN "inspectionExpiry" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
