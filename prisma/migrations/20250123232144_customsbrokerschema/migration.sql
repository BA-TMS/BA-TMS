/*
  Warnings:

  - You are about to drop the column `address` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `addressAddOn` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `postCountry` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the column `telCountry` on the `Broker` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Broker_telephone_key";

-- AlterTable
ALTER TABLE "Broker" DROP COLUMN "address",
DROP COLUMN "addressAddOn",
DROP COLUMN "city",
DROP COLUMN "postCode",
DROP COLUMN "postCountry",
DROP COLUMN "state",
DROP COLUMN "telCountry",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tollFree" TEXT;
