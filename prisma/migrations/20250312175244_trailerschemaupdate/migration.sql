/*
  Warnings:

  - Added the required column `orgId` to the `Trailer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Trailer_licensePlate_key";

-- AlterTable
ALTER TABLE "Trailer" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
