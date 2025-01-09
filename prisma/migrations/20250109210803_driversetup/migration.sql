/*
  Warnings:

  - You are about to drop the column `telCountry` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `city` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DriverType" AS ENUM ('SINGLE', 'TEAM');

-- DropForeignKey
ALTER TABLE "CarrierInsurance" DROP CONSTRAINT "CarrierInsurance_carrierId_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_employerId_fkey";

-- DropIndex
DROP INDEX "Driver_license_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "telCountry",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "type" "DriverType" NOT NULL DEFAULT 'SINGLE',
ADD COLUMN     "zip" TEXT,
ALTER COLUMN "license" DROP NOT NULL,
ALTER COLUMN "employerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TeamDriver" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT,
    "license" TEXT,
    "driverId" TEXT,

    CONSTRAINT "TeamDriver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamDriver_driverId_key" ON "TeamDriver"("driverId");

-- AddForeignKey
ALTER TABLE "CarrierInsurance" ADD CONSTRAINT "CarrierInsurance_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Carrier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamDriver" ADD CONSTRAINT "TeamDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
