/*
  Warnings:

  - The values [PENDING,REFUSED,LOADING_UNLOADING,IN_YARD] on the enum `LoadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoadStatus_new" AS ENUM ('OPEN', 'COVERED', 'DISPATCHED', 'LOADING', 'ON_ROUTE', 'UNLOADING', 'DELIVERED', 'NEEDS_REVIEW', 'CLAIM');
ALTER TABLE "Load" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Load" ALTER COLUMN "status" TYPE "LoadStatus_new" USING ("status"::text::"LoadStatus_new");
ALTER TYPE "LoadStatus" RENAME TO "LoadStatus_old";
ALTER TYPE "LoadStatus_new" RENAME TO "LoadStatus";
DROP TYPE "LoadStatus_old";
ALTER TABLE "Load" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_carrierId_fkey";

-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "carrierId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
