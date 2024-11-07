/*
  Warnings:

  - You are about to drop the column `addressAddOn` on the `Carrier` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Carrier` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Carrier` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Carrier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taxId]` on the table `Carrier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[docketNumber]` on the table `Carrier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ursNumber]` on the table `Carrier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carrierName` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactTelephone` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docketNumType` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docketNumber` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTerms` to the `Carrier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DocketNumber" AS ENUM ('FF', 'MC');

-- AlterTable
ALTER TABLE "Carrier" DROP COLUMN "addressAddOn",
DROP COLUMN "name",
DROP COLUMN "telCountry",
DROP COLUMN "telephone",
ADD COLUMN     "addressField2" TEXT,
ADD COLUMN     "addressField3" TEXT,
ADD COLUMN     "carrierName" TEXT NOT NULL,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactFax" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactTelephone" TEXT NOT NULL,
ADD COLUMN     "contactTollFree" TEXT,
ADD COLUMN     "docketNumType" "DocketNumber" NOT NULL,
ADD COLUMN     "docketNumber" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentTerms" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "ursNumber" TEXT,
ALTER COLUMN "taxId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CarrierInsurance" (
    "id" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "liabilityCompany" TEXT,
    "liabilityPolicy" TEXT,
    "liabilityExpiration" TIMESTAMP(3),
    "liabilityTelephone" TEXT,
    "liabilityContact" TEXT,
    "autoInsCompany" TEXT,
    "autoInsPolicy" TEXT,
    "autoInsExpiration" TIMESTAMP(3),
    "autoInsTelephone" TEXT,
    "autoInsContact" TEXT,
    "cargoCompany" TEXT,
    "cargoPolicy" TEXT,
    "cargoExpiration" TIMESTAMP(3),
    "cargoTelephone" TEXT,
    "cargoContact" TEXT,
    "cargoWSIB" TEXT,
    "fmcsaInsCompany" TEXT NOT NULL,
    "fmcsaInsPolicy" TEXT NOT NULL,
    "fmcsaInsExpiration" TIMESTAMP(3),
    "fmcsaType" TEXT NOT NULL,
    "fmcsaCoverage" TEXT NOT NULL,
    "fmcsaTelephone" TEXT,

    CONSTRAINT "CarrierInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarrierInsurance_carrierId_key" ON "CarrierInsurance"("carrierId");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_taxId_key" ON "Carrier"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_docketNumber_key" ON "Carrier"("docketNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_ursNumber_key" ON "Carrier"("ursNumber");

-- AddForeignKey
ALTER TABLE "CarrierInsurance" ADD CONSTRAINT "CarrierInsurance_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
