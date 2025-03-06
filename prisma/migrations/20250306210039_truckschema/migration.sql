/*
  Warnings:

  - The `status` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `ownerId` on the `Load` table. All the data in the column will be lost.
  - You are about to drop the column `iftaLicensed` on the `Truck` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loadNum]` on the table `Load` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Load` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Truck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_ownerId_fkey";

-- DropIndex
DROP INDEX "Load_ownerId_loadNum_key";

-- DropIndex
DROP INDEX "Truck_licensePlate_key";

-- AlterTable
ALTER TABLE "Carrier" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "orgId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "ownerId",
ADD COLUMN     "orgId" TEXT NOT NULL;

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

-- DropEnum
DROP TYPE "CustomerStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Load_loadNum_key" ON "Load"("loadNum");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
