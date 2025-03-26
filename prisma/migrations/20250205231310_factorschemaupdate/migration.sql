/*
  Warnings:

  - You are about to drop the column `telCountry` on the `Factor` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `Factor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Factor_telephone_key";

-- AlterTable
ALTER TABLE "Factor" DROP COLUMN "telCountry",
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "paymentTerms" TEXT,
ADD COLUMN     "primaryContact" TEXT,
ADD COLUMN     "secondaryContact" TEXT,
ADD COLUMN     "secondaryTelephone" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "tollFree" TEXT;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "docketNumType" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
