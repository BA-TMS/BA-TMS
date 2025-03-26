/*
  Warnings:

  - You are about to drop the column `name` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgName]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[docketNumber]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dotId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `docketNumType` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docketNumber` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgName` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'SALES_REP';
ALTER TYPE "UserRole" ADD VALUE 'DISPATCHER';

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_orgId_fkey";

-- DropIndex
DROP INDEX "Organization_name_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "name",
DROP COLUMN "telCountry",
ADD COLUMN     "docketNumType" "DocketNumber" NOT NULL,
ADD COLUMN     "docketNumber" TEXT NOT NULL,
ADD COLUMN     "dotId" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "orgName" TEXT NOT NULL,
ADD COLUMN     "tollFree" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageURL",
DROP COLUMN "role",
DROP COLUMN "telCountry",
ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "Status" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_userId_key" ON "Permissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_orgName_key" ON "Organization"("orgName");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_docketNumber_key" ON "Organization"("docketNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_dotId_key" ON "Organization"("dotId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
