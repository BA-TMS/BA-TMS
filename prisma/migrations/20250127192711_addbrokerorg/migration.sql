/*
  Warnings:

  - Added the required column `orgId` to the `Broker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Broker" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
