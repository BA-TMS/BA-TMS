/*
  Warnings:

  - The primary key for the `Carrier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Consignee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CoverageMatrix` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Factor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Insurer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Load` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shipper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[dotId]` on the table `Carrier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Consignee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Factor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Insurer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Shipper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxId` to the `Carrier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'DEVELOPER', 'OWNER');

-- CreateEnum
CREATE TYPE "TrailerStatus" AS ENUM ('ACTIVE', 'NOTAVAILABLE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "Carrier" DROP CONSTRAINT "Carrier_factorId_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_carrierId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_destId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_originId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_orgId_fkey";

-- DropIndex
DROP INDEX "Carrier_name_key";

-- DropIndex
DROP INDEX "Consignee_name_key";

-- DropIndex
DROP INDEX "Driver_name_key";

-- DropIndex
DROP INDEX "Shipper_name_key";

-- AlterTable
ALTER TABLE "Carrier" DROP CONSTRAINT "Carrier_pkey",
ADD COLUMN     "taxId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ALTER COLUMN "dotId" SET DATA TYPE TEXT,
ALTER COLUMN "factorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Carrier_id_seq";

-- AlterTable
ALTER TABLE "Consignee" DROP CONSTRAINT "Consignee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Consignee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Consignee_id_seq";

-- AlterTable
ALTER TABLE "CoverageMatrix" DROP CONSTRAINT "CoverageMatrix_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "carrierId" SET DATA TYPE TEXT,
ALTER COLUMN "insurerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CoverageMatrix_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CoverageMatrix_id_seq";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "license" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ALTER COLUMN "employerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Driver_id_seq";

-- AlterTable
ALTER TABLE "Factor" DROP CONSTRAINT "Factor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Factor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Factor_id_seq";

-- AlterTable
ALTER TABLE "Insurer" DROP CONSTRAINT "Insurer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Insurer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Insurer_id_seq";

-- AlterTable
ALTER TABLE "Load" DROP CONSTRAINT "Load_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ALTER COLUMN "loadNum" SET DATA TYPE TEXT,
ALTER COLUMN "carrierId" SET DATA TYPE TEXT,
ALTER COLUMN "driverId" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "originId" SET DATA TYPE TEXT,
ALTER COLUMN "destId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Load_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Load_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "Shipper" DROP CONSTRAINT "Shipper_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "telCountry" SET DEFAULT '1',
ALTER COLUMN "telCountry" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shipper_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shipper_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orgId" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Broker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "crossing" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "telCountry" TEXT NOT NULL DEFAULT '1',
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "truckNum" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "plateExpiry" TIMESTAMP(3) NOT NULL,
    "inspectionExpiry" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "iftaLicensed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "plateExpiry" TIMESTAMP(3) NOT NULL,
    "inspectionExpiry" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "status" "TrailerStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Trailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "telCountry" TEXT NOT NULL DEFAULT '1',
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Billee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Broker_telephone_key" ON "Broker"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Truck_licensePlate_key" ON "Truck"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Trailer_licensePlate_key" ON "Trailer"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Billee_telephone_key" ON "Billee"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_dotId_key" ON "Carrier"("dotId");

-- CreateIndex
CREATE UNIQUE INDEX "Consignee_telephone_key" ON "Consignee"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Factor_telephone_key" ON "Factor"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Insurer_telephone_key" ON "Insurer"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_telephone_key" ON "Shipper"("telephone");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Shipper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_destId_fkey" FOREIGN KEY ("destId") REFERENCES "Consignee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_factorId_fkey" FOREIGN KEY ("factorId") REFERENCES "Factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
