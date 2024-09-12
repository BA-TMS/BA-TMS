/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `addressAddOn` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `postCountry` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billingAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCity` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCountry` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPostCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingState` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingTelephone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactCity` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactCountry` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPostCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactState` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactTelephone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `federalID` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTerms` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropIndex
DROP INDEX "Customer_name_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address",
DROP COLUMN "addressAddOn",
DROP COLUMN "city",
DROP COLUMN "name",
DROP COLUMN "postCode",
DROP COLUMN "postCountry",
DROP COLUMN "state",
DROP COLUMN "telCountry",
DROP COLUMN "telephone",
ADD COLUMN     "billingAddress" TEXT NOT NULL,
ADD COLUMN     "billingAddressField2" TEXT,
ADD COLUMN     "billingAddressField3" TEXT,
ADD COLUMN     "billingCity" TEXT NOT NULL,
ADD COLUMN     "billingCountry" TEXT NOT NULL,
ADD COLUMN     "billingEmail" TEXT NOT NULL,
ADD COLUMN     "billingPostCode" TEXT NOT NULL,
ADD COLUMN     "billingState" TEXT NOT NULL,
ADD COLUMN     "billingTelephone" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "contactAddress" TEXT NOT NULL,
ADD COLUMN     "contactAddressField2" TEXT,
ADD COLUMN     "contactAddressField3" TEXT,
ADD COLUMN     "contactCity" TEXT NOT NULL,
ADD COLUMN     "contactCountry" TEXT NOT NULL,
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactFax" TEXT,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactPostCode" TEXT NOT NULL,
ADD COLUMN     "contactState" TEXT NOT NULL,
ADD COLUMN     "contactTelephone" TEXT NOT NULL,
ADD COLUMN     "contactTollFree" TEXT,
ADD COLUMN     "creditLimit" DECIMAL(65,30) NOT NULL DEFAULT 5000,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "factorId" TEXT,
ADD COLUMN     "federalID" TEXT NOT NULL,
ADD COLUMN     "paymentTerms" TEXT NOT NULL,
ADD COLUMN     "salesRepName" TEXT,
ADD COLUMN     "secondaryContactName" TEXT,
ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Customer_companyName_key" ON "Customer"("companyName");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_factorId_fkey" FOREIGN KEY ("factorId") REFERENCES "Factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
