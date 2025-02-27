/*
  Warnings:

  - The `status` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `ownerId` on the `Load` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loadNum]` on the table `Load` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Load` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_ownerId_fkey";

-- DropIndex
DROP INDEX "Load_ownerId_loadNum_key";

-- AlterTable
ALTER TABLE "Carrier" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "orgId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "ownerId",
ADD COLUMN     "orgId" TEXT NOT NULL;

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
